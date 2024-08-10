import express from 'express';
import createAddress from '#controllers/address/createAddress.js';
import deleteAddress from '#controllers/address/deleteAddress.js';
import getAddress from '#controllers/address/getAddress.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import { validateAddAddress } from '#middlewares/validators/addressValidator.js';

const addressRouter = express.Router();

addressRouter.post('/create', validateAddAddress, isRequestValidated, createAddress);
addressRouter.delete('/delete', deleteAddress);
addressRouter.get('/:addressId', getAddress);
addressRouter.get('/', getAddress);

export default addressRouter;
