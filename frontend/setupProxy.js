const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://170.64.130.58:8000',  // Replace with your Django backend URL
      changeOrigin: true,
    })
  );
};
