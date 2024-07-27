## Detailed Report on E-commerce Application Design Using MERN Stack, Docker, Kubernetes, and MongoDB

### Introduction

This report details the design of an e-commerce application using the MERN stack (MongoDB, Express, React, Node.js), Docker, and Kubernetes. The design includes data flow diagrams (DFDs), class diagrams, entity-relationship (ER) diagrams, and various other UML diagrams to illustrate the system architecture and data handling.

### 1. System Architecture

#### 1.1 MERN Stack

- **MongoDB**: A NoSQL database used for storing user, product, cart, and order data.
- **Express**: A web application framework for Node.js, providing a robust set of features for web and mobile applications.
- **React**: A JavaScript library for building user interfaces, specifically for single-page applications.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.

#### 1.2 Docker and Kubernetes

- **Docker**: Used for containerizing the application, ensuring consistency across different environments.
- **Kubernetes**: Manages containerized applications in a clustered environment, ensuring high availability and scalability.

### 2. Database Design

#### 2.1 MongoDB Document Structure

##### User Collection

```json
{
  "_id": "user_id_1",
  "userName": "JohnDoe",
  "email": "john@example.com",
  "password": "hashed_password",
  "createdDate": "2024-01-01T00:00:00Z",
  "updatedDate": "2024-07-01T00:00:00Z"
}
```

##### Product Collection

```json
{
  "_id": "product_id_1",
  "productName": "Laptop",
  "description": "High-performance laptop",
  "price": 1000,
  "stock": 50,
  "categoryId": "category_id_1",
  "createdDate": "2024-01-01T00:00:00Z",
  "updatedDate": "2024-07-01T00:00:00Z"
}
```

##### Category Collection

```json
{
  "_id": "category_id_1",
  "categoryName": "Electronics",
  "description": "Electronic devices",
  "createdDate": "2024-01-01T00:00:00Z",
  "updatedDate": "2024-07-01T00:00:00Z"
}
```

##### Cart Collection

```json
{
  "_id": "cart_id_1",
  "userId": "user_id_1",
  "totalPrice": 1950,
  "createdDate": "2024-01-01T00:00:00Z",
  "updatedDate": "2024-07-01T00:00:00Z",
  "products": [
    {
      "productId": "product_id_1",
      "productName": "Laptop",
      "quantity": 1,
      "unitPrice": 1000
    },
    {
      "productId": "product_id_2",
      "productName": "Smartphone",
      "quantity": 1,
      "unitPrice": 700
    },
    {
      "productId": "product_id_3",
      "productName": "Headphones",
      "quantity": 1,
      "unitPrice": 200
    },
    {
      "productId": "product_id_4",
      "productName": "Mouse",
      "quantity": 1,
      "unitPrice": 50
    }
  ]
}
```

##### Order Collection

```json
{
  "_id": "order_id_1",
  "userId": "user_id_1",
  "totalPrice": 1950,
  "orderDate": "2024-07-05T00:00:00Z",
  "status": "Processing",
  "shippingAddress": "123 Main St, Anytown",
  "products": [
    {
      "productId": "product_id_1",
      "productName": "Laptop",
      "quantity": 1,
      "unitPrice": 1000
    },
    {
      "productId": "product_id_2",
      "productName": "Smartphone",
      "quantity": 1,
      "unitPrice": 700
    },
    {
      "productId": "product_id_3",
      "productName": "Headphones",
      "quantity": 1,
      "unitPrice": 200
    },
    {
      "productId": "product_id_4",
      "productName": "Mouse",
      "quantity": 1,
      "unitPrice": 50
    }
  ]
}
```

### 3. Diagrams

#### 3.1 Data Flow Diagram (DFD)

##### Level 1 DFD

![Level 1 DFD](https://www.lucidchart.com/documents/view/ef5f1346-6d5c-4a9d-abc7-5cbf3b99e3f0)

- **User**: Interacts with the system through the front-end (React).
- **Authentication**: Handles login and registration.
- **Product Management**: Allows users to view products.
- **Cart Management**: Manages the user's cart.
- **Order Management**: Handles order placement and tracking.

##### Level 2 DFD

![Level 2 DFD](https://www.lucidchart.com/documents/view/5f342e5b-dcf0-4744-92f4-c5f8778f7c5b)

- **User Details**: User logs in or registers.
- **Product Details**: User browses and selects products.
- **Cart Details**: User adds/removes products in the cart.
- **Order Processing**: User places an order and tracks its status.

#### 3.2 Class Diagram

```plaintext
+------------------+      +------------------+      +------------------+
|      User        |      |     Product      |      |    Category      |
+------------------+      +------------------+      +------------------+
| - userId         |      | - productId      |      | - categoryId     |
| - userName       |      | - productName    |      | - categoryName   |
| - email          |      | - description    |      | - description    |
| - password       |      | - price          |      | - createdDate    |
| - createdDate    |      | - stock          |      | - updatedDate    |
| - updatedDate    |      | - categoryId     |      +------------------+
+------------------+      | - createdDate    |
                          | - updatedDate    |
                          +------------------+
                                   |
                                   |
                                   V
+------------------+      +------------------+      +------------------+
|      Cart        |      |    CartProduct   |      |      Order       |
+------------------+      +------------------+      +------------------+
| - cartId         |      | - cartProductId  |      | - orderId        |
| - userId         |      | - cartId         |      | - userId         |
| - totalPrice     |      | - productId      |      | - totalPrice     |
| - createdDate    |      | - quantity       |      | - orderDate      |
| - updatedDate    |      | - unitPrice      |      | - status         |
| - products[]     |      +------------------+      | - shippingAddress|
+------------------+                                   | - products[]     |
                                                      +------------------+
```

#### 3.3 Entity-Relationship (ER) Diagram

![ER Diagram](https://www.lucidchart.com/documents/view/3f2454c7-2c56-4311-8d07-9c620ad17e3e)

- **User**: Related to **Cart** and **Order**.
- **Cart**: Contains multiple **CartProduct** entries.
- **Product**: Associated with **Category** and appears in **CartProduct** and **OrderProduct**.
- **Order**: Contains multiple **OrderProduct** entries.

#### 3.4 Composite Structure Diagram

![Composite Structure Diagram](https://www.lucidchart.com/documents/view/0c78b973-8f4e-44b7-9c8e-9edcd6e1e57a)

- **Front-end (React)**: Handles user interactions and API calls.
- **Back-end (Express/Node.js)**: Manages business logic and database interactions.
- **Database (MongoDB)**: Stores all data related to users, products, carts, and orders.

#### 3.5 Activity Diagram

![Activity Diagram](https://www.lucidchart.com/documents/view/6b745f42-65b4-46c6-88ea-0a37dbb9259e)

- **User Registration/Login**: User signs up or logs in.
- **Browsing Products**: User views product categories and details.
- **Managing Cart**: User adds/removes products from the cart.
- **Placing Order**: User reviews the cart and places an order.
- **Order Processing**: System processes the order and updates status.

#### 3.6 Admin Activity Diagram

![Admin Activity Diagram](https://www.lucidchart.com/documents/view/1a2347b1-65b2-4b45-8f45-65e1cf10e473)

- **Managing Products**: Admin adds/updates/removes products.
- **Managing Categories**: Admin adds/updates/removes categories.
- **Order Management**: Admin views and updates order status.
- **User Management**: Admin views and manages user accounts.

### Conclusion

This report provides a comprehensive overview of the design and architecture of an e-commerce application using the MERN stack with MongoDB as the database. The diagrams and examples illustrate how different components interact and how data is managed and stored within the system. This design ensures scalability, maintainability, and performance, leveraging modern technologies like Docker and Kubernetes for deployment and orchestration.
