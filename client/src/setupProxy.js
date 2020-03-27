const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'https://explore-welly.herokuapp.com/',
      changeOrigin: true,
    })
  );
};
