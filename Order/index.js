import connectDB from "#config/dbConfig.js";
import express from "express";
import dotenv from "dotenv";
import orderRoutes from "#routes/orderRoutes.js";
import { initializeEventHandlers } from "./eventHandlers/index.js";
import ServiceRegistry from "../shared/serviceRegistry/ServiceRegistry.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000;
connectDB(DATABASE_URL)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({ 
    status: "healthy", 
    service: "order-service",
    timestamp: new Date().toISOString()
  });
});

app.get("/hello", (_, res) => {
  res.status(200).send({message:"Hello from order service."})
});

app.use(orderRoutes)

// Initialize event handlers
initializeEventHandlers().then(() => {
  console.log('Order Service event handlers initialized');
}).catch(error => {
  console.error('Failed to initialize event handlers:', error);
});

// Register service with service registry
ServiceRegistry.register('order-service', `http://localhost:${PORT}`, {
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development'
});

app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`);
})