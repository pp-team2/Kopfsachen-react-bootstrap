const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use("/api/self-service",
        createProxyMiddleware({
            target: 'https://auth.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );

    app.use("/api/sessions",
        createProxyMiddleware({
            target: 'https://auth.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );

    app.use("/api/wiki",
        createProxyMiddleware({
            target: 'https://wiki.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );

    app.use("/api/user",
        createProxyMiddleware({
            target: 'https://users.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );

    app.use("/api/safetyNet",
        createProxyMiddleware({
            target: 'https://motivator.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );

    app.use("/api/motivator",
        createProxyMiddleware({
            target: 'https://motivator.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );

    app.use("/api/result",
        createProxyMiddleware({
            target: 'https://motivator.api.live.mindtastic.lol',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''},
        })
    );
}
