import express from "express";
import { addProductToCart } from "#controllers/addProductToCart.js";
import { validateAddProduct } from "#validators/validators.js";
import isRequestValidated from "#validators/validatorErrorHandler.js";

const cartRouter = express.Router();

cartRouter.post(
  "/addProduct",
  validateAddProduct,
  isRequestValidated,
  addProductToCart
);

export default cartRouter;
