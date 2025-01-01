const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy for API 1
  app.use(
    '/api1', // Route to match
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: { '^/api1': '' }, // Optional: Removes `/api1` from the request path
    })
  );

  // Proxy for API 2
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'http://localhost:8090',
      changeOrigin: true,
      pathRewrite: { '^/api2': '' }, // Optional: Removes `/api2` from the request path
    })
  );
};
