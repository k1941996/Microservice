import express from 'express';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';
import authProtectedRoutes from './authProtectedRoutes.js';
import authPublicRoutes from './authPublicRoutes.js';
import addressRoutes from './addressRoutes.js';

const router = express.Router();

router.use('/', authPublicRoutes);
router.use('/secure', checkUserAuthenticity, authProtectedRoutes);
router.use('/address', checkUserAuthenticity, addressRoutes);

export default router;
