import express from "express";
import { checkIfAdmin } from "#middlewares/checkIfAdmin.js";
import { validateCreateProduct } from "#validators/validateCreateProduct.js";
import isRequestValidated from "#validators/validatorErrorHandler.js";
import { createProduct } from "#controllers/ProductAdminController/CreateProduct.js";
import { getAllProducts } from "#controllers/ProductPublicController/getAllProducts.js";


const productRouter = express.Router();

productRouter.post(
  "/create",
  checkIfAdmin,
  validateCreateProduct,
  isRequestValidated,
  createProduct
);

productRouter.get("/all", getAllProducts);

export default productRouter;
