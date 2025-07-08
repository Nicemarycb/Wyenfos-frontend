// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://us-central1-wyenfos-b7b96.cloudfunctions.net',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};