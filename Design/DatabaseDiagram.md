Certainly! Below is the updated database diagram for the e-commerce application using MongoDB as the database, without the **Category** collection.

### MongoDB Database Diagram

#### Collections

1. **User Collection**
2. **Product Collection**
3. **Cart Collection**
4. **Order Collection**

### Database Diagram

```plaintext
+------------------+       +------------------+       +------------------+
|      User        |       |     Product      |       |      Order       |
+------------------+       +------------------+       +------------------+
| - _id            |       | - _id            |       | - _id            |
| - userName       |       | - productName    |       | - userId         |
| - email          |       | - description    |       | - totalPrice     |
| - password       |       | - price          |       | - orderDate      |
| - createdDate    |       | - stock          |       | - status         |
| - updatedDate    |       | - createdDate    |       | - shippingAddress|
+------------------+       | - updatedDate    |       | - products[]     |
                           +------------------+       +------------------+
                                   |
                                   |
                                   V
                          +------------------+      
                          |      Cart        |
                          +------------------+
                          | - _id            |
                          | - userId         |
                          | - totalPrice     |
                          | - createdDate    |
                          | - updatedDate    |
                          | - products[]     |
                          +------------------+
```

### Example Document Structures

#### User Collection
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

#### Product Collection
```json
{
  "_id": "product_id_1",
  "productName": "Laptop",
  "description": "High-performance laptop",
  "price": 1000,
  "stock": 50,
  "createdDate": "2024-01-01T00:00:00Z",
  "updatedDate": "2024-07-01T00:00:00Z"
},
{
  "_id": "product_id_2",
  "productName": "Smartphone",
  "description": "Latest model smartphone",
  "price": 700,
  "stock": 100,
  "createdDate": "2024-02-01T00:00:00Z",
  "updatedDate": "2024-07-10T00:00:00Z"
},
{
  "_id": "product_id_3",
  "productName": "Headphones",
  "description": "Noise-cancelling headphones",
  "price": 200,
  "stock": 200,
  "createdDate": "2024-03-01T00:00:00Z",
  "updatedDate": "2024-07-15T00:00:00Z"
},
{
  "_id": "product_id_4",
  "productName": "Mouse",
  "description": "Wireless mouse",
  "price": 50,
  "stock": 300,
  "createdDate": "2024-04-01T00:00:00Z",
  "updatedDate": "2024-07-20T00:00:00Z"
}
```

#### Cart Collection
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

#### Order Collection
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

### Explanation

1. **User Collection**: Stores user information such as user ID, name, email, password, and timestamps for account creation and updates.
2. **Product Collection**: Stores product details including product ID, name, description, price, stock, and timestamps.
3. **Cart Collection**: Each document represents a cart belonging to a user. It includes user ID, total price, timestamps, and a list of products (with product ID, name, quantity, and unit price).
4. **Order Collection**: Each document represents an order placed by a user. It includes user ID, total price, order date, status, shipping address, and a list of products (with product ID, name, quantity, and unit price).

### Summary

The updated database design for the e-commerce application using MongoDB simplifies the schema by embedding product details within the cart and order documents. This design enhances performance and simplifies data retrieval, leveraging MongoDB's document-oriented capabilities. The provided diagrams and examples illustrate how different entities are structured and related within the system.