import { check } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validateProductId = [
  check("product_id")
    .exists()
    .withMessage("product_id not present.")
    .bail()
    .custom(async (product_id) => {
      if (!isValidObjectId(product_id)) {
        throw new Error("Invalid Product ID Provided.");
      }
    })
    .bail(),
];

export const validateAddProduct = [
  check("product_id")
    .exists()
    .withMessage("product_id not present.")
    .bail()
    .custom(async (product_id) => {
      if (!isValidObjectId(product_id)) {
        throw new Error("Invalid Product ID Provided.");
      }
    })
    .bail(),
  check("quantity").exists().withMessage("quantity not present.").bail().isFloat({ min: 1 }).bail(),
];
