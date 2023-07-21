const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.60.0.5:8000',  // Replace with your Django backend URL
      changeOrigin: true,
    })
  );
};
