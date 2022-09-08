const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use("/self-service",
        createProxyMiddleware({
            target: 'https://auth.api.live.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/sessions",
        createProxyMiddleware({
            target: 'https://auth.api.live.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/wiki",
        createProxyMiddleware({
            target: 'https://wiki.api.live.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/user",
        createProxyMiddleware({
            target: 'https://users.api.live.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/safetyNet",
        createProxyMiddleware({
            target: 'https://motivator.api.live.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/motivator",
        createProxyMiddleware({
            target: 'https://motivator.api.live.mindtastic.lol',
            changeOrigin: true,
        })
    );

    app.use("/result",
        createProxyMiddleware({
            target: 'https://motivator.api.live.mindtastic.lol',
            changeOrigin: true,
            })
    );
}