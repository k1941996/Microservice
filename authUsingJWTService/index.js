import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from '#config/dbConfig.js';
import routes from '#routes/index.js';
import gatewayRouter from '#routes/gatewayRoutes.js';
import EventBus from '../shared/eventBus/EventBus.js';
import ServiceRegistry from "../shared/serviceRegistry/ServiceRegistry.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

const PORT = process.env.PORT || 8000;

// Health check endpoint
app.get('/health', (req, res) => {
  const eventBusStatus = EventBus.getConnectionStatus();
  res.status(200).send({
    status: "healthy",
    service: "auth-service",
    eventBus: eventBusStatus,
    timestamp: new Date().toISOString()
  });
});

app.get('/hello', (req, res) => {
  res.status(200).send('Hello from gateway service');
});

app.use(routes);
app.use(gatewayRouter);

// Initialize EventBus connection
const initializeEventBus = async () => {
  try {
    await EventBus.connect();
    console.log('Auth Service EventBus initialized');
  } catch (error) {
    console.error('Failed to initialize EventBus:', error);
    console.log('Service will continue without event publishing');
  }
};

ServiceRegistry.register('auth-service', `http://localhost:${PORT}`, {
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development'
});

app.listen(PORT, async () => {
  console.log(`Gateway service with auth running on http://localhost:${PORT}`);

  // Initialize EventBus after server starts
  await initializeEventBus();
});


