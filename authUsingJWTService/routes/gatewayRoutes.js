import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const gatewayRouter = express.Router();

const gatewayUrls = {
  '/product': {
    target: 'http://localhost:10180',
    protectedRoutes: ['/create', '/update', '/delete'],
    publicRoutes: ['/all', '/id', '/'],
  },
  '/cart': {
    target: 'http://localhost:4000',
    protectedRoutes: ['/addProduct', '/'],
  },
};

const createProxy = (url, routes, isProtected) => {
  if (routes?.length) {
    const middlewares = [
      isProtected && checkUserAuthenticity,
      createProxyMiddleware({
        target: gatewayUrls[url].target,
        changeOrigin: true,
        pathFilter: routes,
        on: {
          proxyReq: fixRequestBody,
        },
      }),
    ].filter(Boolean);

    gatewayRouter.use(url, ...middlewares);
  }
};

Object.keys(gatewayUrls).forEach((url) => {
  createProxy(url, gatewayUrls[url].publicRoutes, false);
  createProxy(url, gatewayUrls[url].protectedRoutes, true);
});

gatewayRouter.use((err, req, res, next) => {
  console.error('Proxy error:', err);
  res.status(500).send({ message: 'Something went wrong with the proxy.' });
});

export default gatewayRouter;
