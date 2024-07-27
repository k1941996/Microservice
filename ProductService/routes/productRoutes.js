import express from "express";
import {
  checkIfAdmin,
  checkIfCreatedBySameAdmin,
} from "#middlewares/adminValidations.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "#middlewares/validators/validators.js";
import isRequestValidated from "#validators/validatorErrorHandler.js";
import { getAllProducts } from "#controllers/ProductPublicController/getAllProducts.js";
import { createProduct } from "#controllers/ProductAdminController/CreateProduct.js";
import { updateProduct } from "#controllers/ProductAdminController/UpdateProduct.js";
import { deleteProduct } from "#controllers/ProductAdminController/DeleteProduct.js";
import { getProduct } from "#controllers/ProductPublicController/getProduct.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  validateCreateProduct,
  isRequestValidated,
  checkIfAdmin,
  createProduct
);

productRouter.patch(
  "/update/:product_id",
  validateUpdateProduct,
  isRequestValidated,
  checkIfCreatedBySameAdmin,
  updateProduct
);
productRouter.delete(
  "/delete/:product_id",
  validateUpdateProduct,
  isRequestValidated,
  checkIfCreatedBySameAdmin,
  deleteProduct
);
productRouter.get("/all", getAllProducts);

productRouter.get("/id/:product_id", getProduct);

export default productRouter;
