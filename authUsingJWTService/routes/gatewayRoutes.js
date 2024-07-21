import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const gatewayRouter = express.Router();

const gatewayUrl = {
  '/cart': 'http://localhost:4000',
  '/product': 'http://localhost:10180',
};

for (const route in gatewayUrl) {
  const target = gatewayUrl[route];
  gatewayRouter.use(
    route,
    checkUserAuthenticity,

    createProxyMiddleware({
      target,
      changeOrigin: true,
    }),
  );
}
export default gatewayRouter;
