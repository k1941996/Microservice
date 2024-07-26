import { check } from "express-validator";
import { isValidObjectId } from "mongoose";

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
  check("userId")
    .exists()
    .withMessage("userId not present.")
    .bail()
    .custom(async (userId) => {
      if (!isValidObjectId(userId)) {
        throw new Error("Invalid user ID Provided.");
      }
    })
    .bail(),
  check("quantity")
    .exists()
    .withMessage("quantity not present.")
    .bail()
    .isFloat({ min: 1 })
    .bail(),
];
