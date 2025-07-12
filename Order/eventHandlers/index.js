import EventBus from "../../shared/eventBus/EventBus.js";
import { USER_EVENTS, CART_EVENTS, PRODUCT_EVENTS } from "../../shared/events/EventTypes.js";
import User from "#models/UserModel.js";
import Address from "#models/AddressModel.js";
import Cart from "#models/CartModel.js";

// Handle user creation events from auth service
const handleUserCreated = async (event) => {
  try {
    const { userId, userData, role } = event.data;
    
    // Create local user record
    const user = new User({
      userId: userId,
      name: userData.name,
      email: userData.email,
      userName: userData.userName,
      role: role
    });
    
    await user.save();
    console.log(`User created in Order Service: ${userId}`);
  } catch (error) {
    console.error('Error handling user created event:', error);
  }
};

// Handle customer creation events
const handleCustomerCreated = async (event) => {
  try {
    const { customerId, userId, userData } = event.data;
    
    await User.findOneAndUpdate(
      { userId: userId },
      { role: 'customer' }
    );
    
    console.log(`Customer created in Order Service: ${customerId}`);
  } catch (error) {
    console.error('Error handling customer created event:', error);
  }
};

// Handle address creation events
const handleAddressCreated = async (event) => {
  try {
    const { addressId, userId, addressData } = event.data;
    
    // Create local address record
    const address = new Address({
      addressId: addressId,
      userId: userId,
      address: addressData
    });
    
    await address.save();
    console.log(`Address created in Order Service: ${addressId}`);
  } catch (error) {
    console.error('Error handling address created event:', error);
  }
};

// Handle cart creation events
const handleCartCreated = async (event) => {
  try {
    const { cartId, userId, totalPrice } = event.data;
    
    // Create local cart record
    const cart = new Cart({
      cartId: cartId,
      userId: userId,
      totalPrice: totalPrice,
      productInfo: []
    });
    
    await cart.save();
    console.log(`Cart created in Order Service: ${cartId}`);
  } catch (error) {
    console.error('Error handling cart created event:', error);
  }
};

// Handle cart update events
const handleCartUpdated = async (event) => {
  try {
    const { cartId, userId, totalPrice } = event.data;
    
    await Cart.findOneAndUpdate(
      { cartId: cartId },
      {
        totalPrice: totalPrice,
        lastUpdated: new Date()
      }
    );
    
    console.log(`Cart updated in Order Service: ${cartId}`);
  } catch (error) {
    console.error('Error handling cart updated event:', error);
  }
};

// Initialize event handlers
export const initializeEventHandlers = async () => {
  try {
    await EventBus.connect();
    
    // Subscribe to user events
    await EventBus.subscribe(USER_EVENTS.USER_CREATED, handleUserCreated);
    await EventBus.subscribe(USER_EVENTS.CUSTOMER_CREATED, handleCustomerCreated);
    await EventBus.subscribe(USER_EVENTS.ADDRESS_CREATED, handleAddressCreated);
    
    // Subscribe to cart events
    await EventBus.subscribe(CART_EVENTS.CART_CREATED, handleCartCreated);
    await EventBus.subscribe(CART_EVENTS.CART_UPDATED, handleCartUpdated);
    
    console.log('Order Service event handlers initialized');
  } catch (error) {
    console.error('Failed to initialize event handlers:', error);
  }
}; 