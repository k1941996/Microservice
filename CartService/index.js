import express from "express";
import dotenv from "dotenv";
import { connectDB } from "#config/dbConfig.js";
import cartRouter from "#routes/index.js";
import cors from 'cors';
import { initializeEventHandlers } from "./eventHandlers/index.js";
import ServiceRegistry from "../shared/serviceRegistry/ServiceRegistry.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

const PORT = process.env.PORT || 4000;

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({ 
    status: "healthy", 
    service: "cart-service",
    timestamp: new Date().toISOString()
  });
});

app.get("/hello", (_, res) => {
  res.status(200).send("Hello from cart");
});

app.use(cartRouter);

// Initialize event handlers
initializeEventHandlers().then(() => {
  console.log('Cart Service event handlers initialized');
}).catch(error => {
  console.error('Failed to initialize event handlers:', error);
});

// Register service with service registry
ServiceRegistry.register('cart-service', `http://localhost:${PORT}`, {
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development'
});

app.listen(PORT, () => {
  console.log(`Cart Service running on http://localhost:${PORT}`);
});
