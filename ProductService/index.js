import express from "express";
import dotenv from "dotenv";
import { connectDB } from "#config/dbConfig.js";
import productRouter from "#routes/productRoutes.js";
import { initializeEventHandlers } from "./eventHandlers/index.js";
import ServiceRegistry from "../shared/serviceRegistry/ServiceRegistry.js";

const app = express();

const PORT = process.env.PORT || 10180;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({ 
    status: "healthy", 
    service: "product-service",
    timestamp: new Date().toISOString()
  });
});

app.get("/hello", (req, res) => {
  res.status(200).send({ message: "Hello from product service" });
});

app.use(productRouter);

// Initialize event handlers
initializeEventHandlers().then(() => {
  console.log('Product Service event handlers initialized');
}).catch(error => {
  console.error('Failed to initialize event handlers:', error);
});

// Register service with service registry
ServiceRegistry.register('product-service', `http://localhost:${PORT}`, {
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development'
});

app.listen(PORT, () => {
  console.log(`Product service started on port: http://localhost:${PORT}`);
});
