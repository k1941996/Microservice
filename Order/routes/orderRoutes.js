import express from "express";
import { getCartInfo } from "#api/Cart.js";
import { getShippingAddressFromShippingId } from "#api/User.js";

const orderRoutes = express.Router();

orderRoutes.post("/placeorder", async (req, res) => {
  try {
    // const { shippingId } = req.body;
    const getProductsFromCart = await getCartInfo({ headers: req.headers });

    // const shippingAddress = await getShippingAddressFromShippingId({ headers: req.headers, addressId: shippingId });

    // console.log(getProductsFromCart);
    res.status(200).send({ messaGE: " shippingId ", getProductsFromCart });
  } catch (error) {
    console.log(error.message);
    res.status(200).send({ message: "Something wrong" });
  }
});

export default orderRoutes;
