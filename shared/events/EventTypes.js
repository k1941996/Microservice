// User Events
export const USER_EVENTS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  ADMIN_CREATED: 'admin.created',
  ADMIN_UPDATED: 'admin.updated',
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  ADDRESS_CREATED: 'address.created',
  ADDRESS_UPDATED: 'address.updated',
  ADDRESS_DELETED: 'address.deleted'
};

// Product Events
export const PRODUCT_EVENTS = {
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  STOCK_UPDATED: 'product.stock.updated'
};

// Cart Events
export const CART_EVENTS = {
  CART_CREATED: 'cart.created',
  CART_UPDATED: 'cart.updated',
  CART_DELETED: 'cart.deleted',
  PRODUCT_ADDED_TO_CART: 'cart.product.added',
  PRODUCT_REMOVED_FROM_CART: 'cart.product.removed',
  CART_EMPTIED: 'cart.emptied'
};

// Order Events
export const ORDER_EVENTS = {
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_STATUS_CHANGED: 'order.status.changed',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_COMPLETED: 'order.completed'
};

// Payment Events
export const PAYMENT_EVENTS = {
  PAYMENT_INITIATED: 'payment.initiated',
  PAYMENT_COMPLETED: 'payment.completed',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded'
};

// Notification Events
export const NOTIFICATION_EVENTS = {
  EMAIL_SENT: 'notification.email.sent',
  SMS_SENT: 'notification.sms.sent',
  PUSH_SENT: 'notification.push.sent'
};

const EventTypes = {
  USER_EVENTS
  , PRODUCT_EVENTS
  , CART_EVENTS
  , ORDER_EVENTS
  , PAYMENT_EVENTS
  , NOTIFICATION_EVENTS
}

export default EventTypes;