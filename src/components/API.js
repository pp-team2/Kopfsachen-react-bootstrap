//const baseUrl = "https://auth.api.live.mindtastic.lol";
import MD5 from "crypto-js/md5"
const baseUrl = "";
export default {

    baseUrl: baseUrl,

    initRegistration: async() => {

        const response = await fetch(baseUrl + '/self-service/registration/browser', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },

        });
        const r = await response.json();
        console.log(r)
        return r;
    },

    submitRegistration: async(re) => {
        const response = await fetch("/self-service/registration?flow=" + new URL(re.ui.action).searchParams.get("flow"), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                "method": "password",
                "csrf_token": await re.ui.nodes.filter(x => x.attributes.name == "csrf_token").map(x => x.attributes.value)[0]
            })
        });
        const r = await response.json();
        console.log(r)
        return r
    },

    initLogin: async() => {

        const response = await fetch(baseUrl + '/self-service/login/browser', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },

        });
        const r = await response.json();
        console.log(r)
        return r;
    },

    submitLogin: async(re, key) => {
        const response = await fetch('/self-service/login?flow=' + new URL(re.ui.action).searchParams.get("flow"), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                "method": "password",
                "csrf_token": await re.ui.nodes.filter(x => x.attributes.name == "csrf_token").map(x => x.attributes.value)[0],
                "identifier": key,
                "password": MD5(key).toString()
            })
        });
        const r = await response.json();
        console.log(r)
        return r
    },

    initLogout: async() => {

        const response = await fetch(baseUrl + '/self-service/logout/browser', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },

        });
        const r = await response.json();
        console.log(r)
        return r;
    },

    submitLogout: async(token) => {

        const response = await fetch(baseUrl + '/self-service/logout?token=' + token, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },

        });
        const r = await response;
        return r;
    },


    checkSession: async() => {

        const response = await fetch('/sessions/whoami', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },

        });
        const r = await response.json();
        return r;
    },



    /*
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

    */

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