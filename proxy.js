const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        proxy("/self-service", {
            target: 'https://auth.api.live.mindtastic.lol',
            changeOrigin: true,
            //secure: false,
            //ws: false,

        })
    );

    app.use(
        proxy("/sessions", {
            target: 'https://auth.api.live.mindtastic.lol',
            changeOrigin: true,
            //secure: false,
            //ws: false,

        })
    );
};