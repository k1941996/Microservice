import express from 'express';
import userPublicController from '#controllers/user/public/userPublicController.js';
import {
  validateLoginRequest,
  validateSignUpRequest,
  validateForgotPasswordRequest,
  validateResetPasswordRequest,
} from '#middlewares/validators/authValidator.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const authPublicRouter = express.Router();

authPublicRouter.get('/checkadmin', userPublicController.checkAdmin);

authPublicRouter.post(
  '/signup/:type',
  validateSignUpRequest,
  isRequestValidated,
  userPublicController.signUp,
);
authPublicRouter.post(
  '/login',
  validateLoginRequest,
  isRequestValidated,
  userPublicController.login,
);
authPublicRouter.post(
  '/forgotPassword',
  validateForgotPasswordRequest,
  isRequestValidated,
  userPublicController.forgotPassword,
);
authPublicRouter.post(
  '/resetPassword/:id/:token',
  validateResetPasswordRequest,
  isRequestValidated,
  userPublicController.resetPassword,
);

authPublicRouter.get('/token',checkUserAuthenticity,userPublicController.getUserDetails)

export default authPublicRouter;
