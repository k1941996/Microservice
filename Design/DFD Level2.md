DFD Level2
To create a Level 2 Data Flow Diagram (DFD) for the e-commerce system, we need to further break down each of the processes from Level 1 into more detailed sub-processes.

### Level 2 DFD

#### Process 1.1: User Management
This process can be broken down into:
- **1.1.1 Register User**
- **1.1.2 Login User**
- **1.1.3 Update Profile**

#### Process 1.2: Product Management
This process can be broken down into:
- **1.2.1 Add Product**
- **1.2.2 Update Product**
- **1.2.3 Delete Product**
- **1.2.4 Search/View Product**

#### Process 1.3: Order Processing
This process can be broken down into:
- **1.3.1 Place Order**
- **1.3.2 Confirm Order**
- **1.3.3 Update Order Status**

#### Process 1.4: Cart Management
This process can be broken down into:
- **1.4.1 Add to Cart**
- **1.4.2 View Cart**
- **1.4.3 Remove from Cart**
- **1.4.4 Calculate Total**

#### Process 1.5: Checkout
This process can be broken down into:
- **1.5.1 Enter Billing Information**
- **1.5.2 Enter Payment Information**
- **1.5.3 Process Payment**
- **1.5.4 Confirm Order**

### Detailed Level 2 DFD

#### Process 1.1: User Management

```plaintext
+---------------------+
|      Customer       |
+----------+----------+
           |
           V
  +--------+---------+
  |  1.1 User         |
  |  Management       |
  +--------+---------+
           |
           |
           V
  +--------+---------+        +-----------------+
  |  1.1.1 Register  |        |  D3 User        |
  |  User            |        |  Database       |
  +------------------+        +--------+--------+
           |
           |
           V
  +--------+---------+
  |  1.1.2 Login     |
  |  User            |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.1.3 Update    |
  |  Profile         |
  +------------------+
           |
           V
  +--------+---------+
  |  D3 User         |
  |  Database        |
  +------------------+
```

#### Process 1.2: Product Management

```plaintext
+---------------------+
|        Admin        |
+----------+----------+
           |
           V
  +--------+---------+
  |  1.2 Product      |
  |  Management       |
  +--------+---------+
           |
           |
           V
  +--------+---------+        +-----------------+
  |  1.2.1 Add       |        |  D1 Product     |
  |  Product         |        |  Database       |
  +------------------+        +--------+--------+
           |
           |
           V
  +--------+---------+
  |  1.2.2 Update    |
  |  Product         |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.2.3 Delete    |
  |  Product         |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.2.4 Search/   |
  |  View Product    |
  +------------------+
           |
           V
  +--------+---------+
  |  D1 Product      |
  |  Database        |
  +------------------+
```

#### Process 1.3: Order Processing

```plaintext
+---------------------+
|      Customer       |
+----------+----------+
           |
           V
  +--------+---------+
  |  1.3 Order        |
  |  Processing       |
  +--------+---------+
           |
           |
           V
  +--------+---------+        +-----------------+
  |  1.3.1 Place     |        |  D2 Order       |
  |  Order           |        |  Database       |
  +------------------+        +--------+--------+
           |
           |
           V
  +--------+---------+
  |  1.3.2 Confirm   |
  |  Order           |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.3.3 Update    |
  |  Order Status    |
  +------------------+
           |
           V
  +--------+---------+
  |  D2 Order        |
  |  Database        |
  +------------------+
```

#### Process 1.4: Cart Management

```plaintext
+---------------------+
|      Customer       |
+----------+----------+
           |
           V
  +--------+---------+
  |  1.4 Cart         |
  |  Management       |
  +--------+---------+
           |
           |
           V
  +--------+---------+        +-----------------+
  |  1.4.1 Add to    |        |  D4 Cart        |
  |  Cart            |        |  Database       |
  +------------------+        +--------+--------+
           |
           |
           V
  +--------+---------+
  |  1.4.2 View      |
  |  Cart            |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.4.3 Remove    |
  |  from Cart       |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.4.4 Calculate |
  |  Total           |
  +------------------+
           |
           V
  +--------+---------+
  |  D4 Cart         |
  |  Database        |
  +------------------+
```

#### Process 1.5: Checkout

```plaintext
+---------------------+
|      Customer       |
+----------+----------+
           |
           V
  +--------+---------+
  |  1.5 Checkout     |
  |  Process          |
  +--------+---------+
           |
           |
           V
  +--------+---------+        +-----------------+
  |  1.5.1 Enter     |        |  D4 Cart        |
  |  Billing Info    |        |  Database       |
  +------------------+        +--------+--------+
           |
           |
           V
  +--------+---------+
  |  1.5.2 Enter     |
  |  Payment Info    |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.5.3 Process   |
  |  Payment         |
  +------------------+
           |
           |
           V
  +--------+---------+
  |  1.5.4 Confirm   |
  |  Order           |
  +------------------+
           |
           V
  +--------+---------+
  |  D2 Order        |
  |  Database        |
  +------------------+
```

### Summary
This Level 2 DFD provides detailed breakdowns of the main processes in the e-commerce system:

1. **User Management:** Handles user registration, login, and profile updates.
2. **Product Management:** Admin can add, update, delete, and view products.
3. **Order Processing:** Handles placing orders, confirming orders, and updating order statuses.
4. **Cart Management:** Manages adding items to the cart, viewing the cart, removing items, and calculating totals.
5. **Checkout:** Handles entering billing and payment information, processing payments, and confirming orders.

These detailed processes help clarify the specific data flows and interactions within the system.