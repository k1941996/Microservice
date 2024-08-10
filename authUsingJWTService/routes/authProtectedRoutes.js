import express from 'express';
import userProtectedController from '#controllers/user/protected/userProtectedController.js';
// import authProtectedRouter from './auth/protectedRoutes.js';
import { validateUpdatePasswordRequest } from '#middlewares/validators/authValidator.js';
import isRequestValidated from '#middlewares/validators/commonError.js';

const protectedRouter = express.Router();

protectedRouter.patch(
  '/updatePassword',
  validateUpdatePasswordRequest,
  isRequestValidated,
  userProtectedController.updateUserPassword,
);


export default protectedRouter;
