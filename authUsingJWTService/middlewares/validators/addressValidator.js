import { check } from "express-validator";

export const validateAddAddress = [
  check('name').notEmpty().withMessage('name is a required field').bail(),
  check('streetAddress')
    .notEmpty()
    .withMessage('Stree tAddress is a required field')
    .bail(),
  check('city').notEmpty().withMessage('City is a required field').bail(),
  check('state').notEmpty().withMessage('State is a required field').bail(),
  check('pinCode').notEmpty().withMessage('Pin Code is a required field').bail(),
  check('country').notEmpty().withMessage('Country is a required field').bail(),
  check('mobile_no').notEmpty().withMessage('Mobile Number is a required field').bail(),
];
