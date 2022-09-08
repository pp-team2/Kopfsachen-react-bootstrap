import MD5 from "crypto-js/md5"
const baseUrl = "/api";
const apiCalls = {

    baseUrl: baseUrl,

    initRegistration: async() => {
        return _fetchGET('/self-service/registration/browser', true)
    },

    submitRegistration: async(re) => {

        return _fetchPOST('/self-service/registration?flow=' + new URL(re.ui.action).searchParams.get("flow"), {
            "method": "password",
            "csrf_token": await re.ui.nodes.filter(x => x.attributes.name === "csrf_token").map(x => x.attributes.value)[0]
        })
    },

    initLogin: async() => {
        return _fetchGET('/self-service/login/browser', true)
    },

    submitLogin: async(re, key) => {
        return _fetchPOST('/self-service/login?flow=' + new URL(re.ui.action).searchParams.get("flow"), {
            "method": "password",
            "csrf_token": await re.ui.nodes.filter(x => x.attributes.name === "csrf_token").map(x => x.attributes.value)[0],
            "identifier": key,
            "password": MD5(key).toString()
        })
    },

    initLogout: async() => {
        return _fetchGET('/self-service/logout/browser', true)
    },

    submitLogout: async(token) => {
        return _fetchGET('/self-service/logout?token=' + token, false)
    },

    checkSession: async() => {
        return _fetchGET('/sessions/whoami', true)
    },

    getWiki: async() => {
        return _fetchGET('/wiki', true)
    },

    getUser: async(sessionToken) => {
        return _fetchGETWithAuthorization('/user', true, sessionToken)
    },

    getSafetyNet: async(sessionToken) => {
        return _fetchGETWithAuthorization('/safetyNet', true, sessionToken)
    },

    postSafetyNet: async(sessionToken, name, type, strategies) => {
        return _fetchPOSTWithAuthorization('/safetyNet', {
            "name": name,
            "type": type,
            "strategies": strategies
        }, sessionToken)
    },

    deleteSafetyNet: async(sessionToken, id) => {
        return _fetchDELETEWithAuthorization('/safetyNet/' + id, true, sessionToken)
    },

    replaceSafetyNet: async(sessionToken, id, name, type, strategies) => {
        return _fetchPUTWithAuthorization('/safetyNet/' + id, {
            "name": name,
            "type": type,
            "strategies": strategies
        }, sessionToken)
    },

    getMotivator: async(sessionToken) => {
        return _fetchGETWithAuthorization('/motivator', true, sessionToken)
    },

    postMotivatorResult: async(motivatorId, sessionToken, timestamp, values, feedback) => {
        return _fetchPOSTWithAuthorization('/motivator/' + motivatorId + '/result', {
            "timestamp": timestamp,
            "values": values,
            "feedback": {"rating": feedback}
        }, sessionToken)
    }

};

export default apiCalls

async function _fetchGET(path, res) {
    const response = await fetch(baseUrl + path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (res) {
        const r = await response.json();
        console.log(r)
        return r;
    }
};

async function _fetchGETWithAuthorization(path, res, sessionToken) {
    const response = await fetch(baseUrl + path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
        },
    });

    if (res) {
        const r = await response.json();
        console.log(r)
        return r;
    }
};


async function _fetchPOST(path, bodyobj) {
    const response = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"

        },
        body: JSON.stringify(bodyobj)
    });
    const r = await response.json();
    console.log(r)
    return r
};

async function _fetchPOSTWithAuthorization(path, bodyobj, sessionToken) {
    const response = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(bodyobj)
    });
    const r = await response.json();
    console.log(r)
    return r
};

async function _fetchDELETEWithAuthorization(path, res, sessionToken) {
    const response = await fetch(baseUrl + path, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
        },
    });

    if (res) {
        const r = await response.json();
        console.log(r)
        return r;
    }
};

async function _fetchPUTWithAuthorization(path, bodyobj, sessionToken) {
    const response = await fetch(baseUrl + path, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(bodyobj)
    });
    const r = await response.json();
    console.log(r)
    return r
};
