Creating a database diagram involves defining the tables, columns, primary keys, and foreign keys based on the ER diagram provided earlier. Here's a database diagram that captures the same entities and relationships.

### Database Diagram

#### Tables and Columns

1. **User**
   - userId (Primary Key)
   - name
   - email
   - password
   - address

2. **Admin**
   - adminId (Primary Key, Foreign Key referencing User(userId))

3. **Customer**
   - customerId (Primary Key, Foreign Key referencing User(userId))

4. **Product**
   - productId (Primary Key)
   - name
   - description
   - price
   - stock
   - category

5. **Order**
   - orderId (Primary Key)
   - orderDate
   - status
   - totalAmount
   - customerId (Foreign Key referencing Customer(customerId))

6. **OrderProduct**
   - orderId (Primary Key, Foreign Key referencing Order(orderId))
   - productId (Primary Key, Foreign Key referencing Product(productId))
   - quantity

7. **Cart**
   - cartId (Primary Key)
   - customerId (Foreign Key referencing Customer(customerId))

8. **CartProduct**
   - cartId (Primary Key, Foreign Key referencing Cart(cartId))
   - productId (Primary Key, Foreign Key referencing Product(productId))
   - quantity

9. **Checkout**
   - checkoutId (Primary Key)
   - cartId (Foreign Key referencing Cart(cartId))
   - paymentDetails
   - billingAddress

### Diagram Visualization

```plaintext
+-------------------+    +-------------------+    +-------------------+
|       User        |    |       Admin       |    |     Customer      |
+-------------------+    +-------------------+    +-------------------+
| userId (PK)       |    | adminId (PK, FK)  |    | customerId (PK, FK)|
| name              |    +-------------------+    +-------------------+
| email             |
| password          |
| address           |
+-------------------+

+-------------------+
|     Product       |
+-------------------+
| productId (PK)    |
| name              |
| description       |
| price             |
| stock             |
| category          |
+-------------------+

+-------------------+
|      Order        |
+-------------------+
| orderId (PK)      |
| orderDate         |
| status            |
| totalAmount       |
| customerId (FK)   |
+-------------------+

+-------------------+        +-------------------+
|   OrderProduct    |        |       Cart        |
+-------------------+        +-------------------+
| orderId (PK, FK)  |        | cartId (PK)       |
| productId (PK, FK)|        | customerId (FK)   |
| quantity          |        +-------------------+
+-------------------+
                              +-------------------+
                              |    CartProduct    |
                              +-------------------+
                              | cartId (PK, FK)   |
                              | productId (PK, FK)|
                              | quantity          |
                              +-------------------+

+-------------------+
|     Checkout      |
+-------------------+
| checkoutId (PK)   |
| cartId (FK)       |
| paymentDetails    |
| billingAddress    |
+-------------------+
```

### Explanation of Relationships:
1. **User** table contains common user attributes. 
2. **Admin** and **Customer** tables are extensions of the User table, identified by adminId and customerId, respectively, which are foreign keys referencing userId.
3. **Product** table stores product details.
4. **Order** table stores order details, with a foreign key relationship to the Customer table.
5. **OrderProduct** table manages the many-to-many relationship between Order and Product, containing foreign keys referencing both.
6. **Cart** table manages the shopping cart for each customer, with a foreign key referencing the Customer table.
7. **CartProduct** table manages the many-to-many relationship between Cart and Product, containing foreign keys referencing both.
8. **Checkout** table manages the checkout process, with a foreign key relationship to the Cart table.

This diagram provides a clear and concise representation of the database schema for the e-commerce application, detailing the tables, their columns, and the relationships between them.