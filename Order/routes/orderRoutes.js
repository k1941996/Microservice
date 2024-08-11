import express from "express";
import { emptyCart, getCartInfo } from "#api/Cart.js";
import { getShippingAddressFromShippingId } from "#api/User.js";
import Order from "#models/OrderModel.js";

const orderRoutes = express.Router();

orderRoutes.post("/placeorder", async (req, res) => {
  try {
    const { shippingId } = req.body;
    const userId = req.headers.accountid;
    const currentCartDetails = await getCartInfo({ headers: req.headers });
    const shippingAddress = await getShippingAddressFromShippingId({ headers: req.headers, addressId: shippingId });

    const orderDetails = {
      userId,
      totalPrice: currentCartDetails.cart.totalPrice,
      products: currentCartDetails.cart.productInfo,
      orderDate: new Date(),
      status: "New",
      shippingAddress: shippingAddress.address,
    };
    const newOrder = new Order(orderDetails);
    const createdOrder = await newOrder.save();
    if (createdOrder) {
      // await emptyCart({ headers: req.headers });
      return res.status(200).send({ message: " Order Created Successfully ", order: createdOrder });
    }
    // return res.status(200).send({ messaGE: " Order Created Successfully " });
  } catch (error) {
    console.log(error.message);
    res.status(200).send({ message: "Something wrong" });
  }
});

export default orderRoutes;
