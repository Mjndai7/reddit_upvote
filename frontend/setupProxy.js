const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.42.43.249:8000',  // Replace with your Django backend URL
      changeOrigin: true,
    })
  );
};
