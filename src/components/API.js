const baseUrl = "https://auth.api.live.mindtastic.lol/";

export default {

    baseUrl: baseUrl,

    initRegistration: async() => {

        const response = await _fetch('/self-service/registration/api');
        const r = await response.json();
        return r.ui.action;
    },

    submitRegistration: async(actionUrl) => {
        const response = await fetch(actionUrl, { method: 'POST', appendBaseUrl: false });
        const r = await response.json();
        return r
    },

    initLogin: async() => {
        const response = await _fetch("/self-service/login/api");
        const r = await response.json();
        return r.ui.action;
    },

    submitLogin: async(actionUrl) => {
        debugger;
        const response = await fetch(actionUrl, {
            method: 'POST',
            appendBaseUrl: false
        });
        const r = await response.json()
        return r;
    },

    queryEcho: async(sessionToken) => {
        const response = await _fetch("https://echo.api.live.mindtastic.lol/", {
            appendBaseUrl: false,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
            body: `Hello`,
        })

        return response.text();
    }

};

async function _fetch(path, options = {}) {
    const appendUrl = options.appendBaseUrl ? false : true;
    if (appendUrl) {
        path = baseUrl + path;
    }

    console.log(path)
    const response = await fetch(path, {
        method: 'GET',
        ...options,
    })


    if (!response.ok) {
        //const error = (data && data.message) || response.status;
        //throw new Error(error);
    }

    return response;
};