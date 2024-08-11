import express from "express";
import { addProductToCart } from "#controllers/addProductToCart.js";
import { validateProductId, validateAddProduct } from "#validators/validators.js";
import isRequestValidated from "#validators/validatorErrorHandler.js";
import { getCart } from "#controllers/getCart.js";
import { deleteProduct } from "#controllers/deleteProduct.js";
import { updateProductQty } from "#controllers/updateProductQty.js";
import { deleteCart } from "#controllers/deleteCart.js";

const cartRouter = express.Router();

cartRouter.post("/addProduct", validateAddProduct, isRequestValidated, addProductToCart);

cartRouter.get("/", getCart);

cartRouter.delete("/deleteProduct", validateProductId, isRequestValidated, deleteProduct);

cartRouter.put("/updateProductQty", validateAddProduct, isRequestValidated, updateProductQty);
cartRouter.delete("/deleteCart", deleteCart);

export default cartRouter;
