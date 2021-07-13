const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/sp",
    createProxyMiddleware({
      target: "https://www.synnara.co.kr/",
      changeOrigin: false,
    })
  );
  app.use(
    "/stores",
    createProxyMiddleware({
      target: "https://api.bigcommerce.com/",
      changeOrigin: true,
    })
  );
  app.use(
    "/interasiastock",
    createProxyMiddleware({
      target: "https://localhost:5001/",
      changeOrigin: true,
    })
  );
};
