import express from "express";
import Order from "#models/OrderModel.js";
import Cart from "#models/CartModel.js";
import Address from "#models/AddressModel.js";
import EventBus from "../../shared/eventBus/EventBus.js";
import { ORDER_EVENTS } from "../../shared/events/EventTypes.js";

const orderRoutes = express.Router();

orderRoutes.post("/placeorder", async (req, res) => {
  try {
    const { shippingId } = req.body;
    const userId = req.headers.accountid;
    
    // Use local data instead of calling other services
    const currentCart = await Cart.findOne({ userId });
    const shippingAddress = await Address.findOne({ 
      addressId: shippingId, 
      userId 
    });

    if (!currentCart) {
      return res.status(400).send({ message: "Cart not found" });
    }

    if (!shippingAddress) {
      return res.status(400).send({ message: "Shipping address not found" });
    }

    const orderDetails = {
      userId,
      totalPrice: currentCart.totalPrice,
      products: currentCart.productInfo,
      orderDate: new Date(),
      status: "New",
      shippingAddress: shippingAddress.address,
    };
    
    const newOrder = new Order(orderDetails);
    const createdOrder = await newOrder.save();
    
    if (createdOrder) {
      // Publish order created event
      await EventBus.publish(ORDER_EVENTS.ORDER_CREATED, {
        orderId: createdOrder._id,
        userId,
        totalPrice: createdOrder.totalPrice,
        products: createdOrder.products,
        status: createdOrder.status
      });

      // Publish cart emptied event (for cart service to handle)
      await EventBus.publish('cart.emptied', {
        cartId: currentCart.cartId,
        userId
      });

      return res.status(200).send({ 
        message: "Order Created Successfully", 
        order: createdOrder 
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default orderRoutes;
