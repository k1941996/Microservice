import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const gatewayRouter = express.Router();

const gatewayProtectedUrl = {
  '/cart': 'http://localhost:4000',
  '/product': 'http://localhost:10180',

};

const gatewayPublicUrl = {
  '/product': 'http://localhost:10180',
};

for (const route in gatewayProtectedUrl) {
  const target = gatewayProtectedUrl[route];
  gatewayRouter.use(
    route,
    checkUserAuthenticity,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
      },
    }),
  );
}
for (const route in gatewayPublicUrl) {
  const target = gatewayPublicUrl[route];
  gatewayRouter.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
      },
    }),
  );
}
export default gatewayRouter;
