#!/bin/bash

echo "Starting Microservices with Health Monitoring..."

# Start the core services first
echo "Starting core services..."
docker-compose up -d rabbitmq
docker-compose up -d auth-db product-db cart-db order-db

# Wait for databases to be ready
echo "Waiting for databases to be ready..."
sleep 10

# Start the microservices
echo "Starting microservices..."
docker-compose up -d auth-service
sleep 5
docker-compose up -d product-service
sleep 5
docker-compose up -d cart-service
sleep 5
docker-compose up -d order-service
sleep 5

# Start the health monitor service last
echo "Starting health monitor service..."
docker-compose up -d health-monitor-service

echo "All services started!"
echo ""
echo "Health Monitor Dashboard: http://localhost:9000/health"
echo "All Services Health: http://localhost:9000/services/health"
echo ""
echo "Individual Service Health:"
echo "- Auth Service: http://localhost:8000/health"
echo "- Product Service: http://localhost:10180/health"
echo "- Cart Service: http://localhost:4000/health"
echo "- Order Service: http://localhost:5000/health"
echo ""
echo "To view logs: docker-compose logs -f health-monitor-service" 