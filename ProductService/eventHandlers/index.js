import EventBus from "../../shared/eventBus/EventBus.js";
import EventTypes from "../../shared/events/EventTypes.js";
const { USER_EVENTS, CART_EVENTS, ORDER_EVENTS } = EventTypes;
import Admin from "#models/AdminModel.js";

// Handle admin creation events from auth service
const handleAdminCreated = async (event) => {
  try {
    const { adminId, userId, userData } = event.data;
    
    // Create local admin record
    const admin = new Admin({
      userId: userId,
      roleType: 'admin',
      permissions: ['all']
    });
    
    await admin.save();
    console.log(`Admin created in Product Service: ${adminId}`);
  } catch (error) {
    console.error('Error handling admin created event:', error);
  }
};

// Handle admin updated events
const handleAdminUpdated = async (event) => {
  try {
    const { adminId, userId, userData } = event.data;
    
    await Admin.findByIdAndUpdate(adminId, {
      userId: userId,
      lastUpdated: new Date()
    });
    
    console.log(`Admin updated in Product Service: ${adminId}`);
  } catch (error) {
    console.error('Error handling admin updated event:', error);
  }
};

// Initialize event handlers
export const initializeEventHandlers = async () => {
  try {
    await EventBus.connect();
    
    // Subscribe to user events
    await EventBus.subscribe(USER_EVENTS.ADMIN_CREATED, handleAdminCreated);
    await EventBus.subscribe(USER_EVENTS.ADMIN_UPDATED, handleAdminUpdated);
    
    console.log('Product Service event handlers initialized');
  } catch (error) {
    console.error('Failed to initialize event handlers:', error);
  }
}; 