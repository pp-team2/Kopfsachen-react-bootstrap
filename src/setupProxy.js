const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use("/self-service",
        createProxyMiddleware({
            target: 'https://auth.api.dev.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/sessions",
        createProxyMiddleware({
            target: 'https://auth.api.dev.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/wiki",
        createProxyMiddleware({
            target: 'https://wiki.api.dev.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/user",
        createProxyMiddleware({
            target: 'https://users.api.dev.mindtastic.lol',
            changeOrigin: true,
        })
    );
}