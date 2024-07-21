import { check, param } from "express-validator";
import { isValidObjectId } from "mongoose";

const validateCreateProduct = [
  check("name").notEmpty().withMessage("Name is required field").bail(),
  check("description")
    .notEmpty()
    .withMessage("Description is required field")
    .bail(),
  check("price")
    .notEmpty()
    .withMessage("Price is required field")
    .bail()
    .isFloat({ min: 1 })
    .bail("Minimum price should be 1 or greater."),
  check("stock")
    .notEmpty()
    .withMessage("Stock is required field")
    .bail()
    .isFloat({ min: 1 })
    .bail("Minimum stock should be 1"),
  check("category").notEmpty().withMessage("Category is required field").bail(),
];

const validateUpdateProduct = [
  param("product_id")
    .exists()
    .withMessage("product_id not present.")
    .bail()
    .custom(async (product_id) => {
      console.log(product_id);
      if (!isValidObjectId(product_id)) {
        throw new Error("Invalid Product ID Provided.");
      }
    }).bail(),
];

export { validateCreateProduct, validateUpdateProduct };
