import express from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const gatewayRouter = express.Router();

const gatewayUrls = {
  '/product': {
    target: 'http://localhost:10180',
    protectedRoutes: ['/create', '/update', '/delete'],
    publicRoutes: ['/all', '/id', '/hello'],
  },
  '/cart': {
    target: 'http://localhost:4000',
    protectedRoutes: ['/addProduct', '/hello','/'],
  },
  '/order': {
    target: 'http://localhost:5000',
    protectedRoutes: ['/placeorder'],
    publicRoutes: ['/hello'],
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
          error: (err, _, res) => {
            console.log('Proxy error', err);
            res
              .status(500)
              .send({ message: 'Something went wrong while reaching the server.' });
          },
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

export default gatewayRouter;
