import EventBus from "../../shared/eventBus/EventBus.js";
import { PRODUCT_EVENTS, ORDER_EVENTS } from "../../shared/events/EventTypes.js";
import Product from "#models/ProductModel.js";
import Cart from "#models/CartModel.js";

// Handle product creation events from product service
const handleProductCreated = async (event) => {
  try {
    const { productId, productData, adminId } = event.data;
    
    // Create local product record
    const product = new Product({
      productId: productId,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      category: productData.category,
      createdBy: adminId
    });
    
    await product.save();
    console.log(`Product created in Cart Service: ${productId}`);
  } catch (error) {
    console.error('Error handling product created event:', error);
  }
};

// Handle product update events
const handleProductUpdated = async (event) => {
  try {
    const { productId, productData } = event.data;
    
    await Product.findOneAndUpdate(
      { productId: productId },
      {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category: productData.category,
        lastUpdated: new Date()
      }
    );
    
    console.log(`Product updated in Cart Service: ${productId}`);
  } catch (error) {
    console.error('Error handling product updated event:', error);
  }
};

// Handle stock update events
const handleStockUpdated = async (event) => {
  try {
    const { productId, newStock } = event.data;
    
    await Product.findOneAndUpdate(
      { productId: productId },
      {
        stock: newStock,
        lastUpdated: new Date()
      }
    );
    
    console.log(`Stock updated in Cart Service: ${productId} -> ${newStock}`);
  } catch (error) {
    console.error('Error handling stock updated event:', error);
  }
};

// Handle cart emptied events from order service
const handleCartEmptied = async (event) => {
  try {
    const { cartId, userId } = event.data;
    
    await Cart.findOneAndUpdate(
      { userId: userId },
      {
        productInfo: [],
        totalPrice: 0,
        updatedDate: new Date()
      }
    );
    
    console.log(`Cart emptied in Cart Service: ${cartId}`);
  } catch (error) {
    console.error('Error handling cart emptied event:', error);
  }
};

// Initialize event handlers
export const initializeEventHandlers = async () => {
  try {
    await EventBus.connect();
    
    // Subscribe to product events
    await EventBus.subscribe(PRODUCT_EVENTS.PRODUCT_CREATED, handleProductCreated);
    await EventBus.subscribe(PRODUCT_EVENTS.PRODUCT_UPDATED, handleProductUpdated);
    await EventBus.subscribe(PRODUCT_EVENTS.STOCK_UPDATED, handleStockUpdated);
    
    // Subscribe to order events
    await EventBus.subscribe('cart.emptied', handleCartEmptied);
    
    console.log('Cart Service event handlers initialized');
  } catch (error) {
    console.error('Failed to initialize event handlers:', error);
  }
}; 