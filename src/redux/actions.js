import {_apiBase as api} from '../services/configuration';

export const userPostFetch = user => {
    return dispatch => {
        return fetch(`${api}/registration/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                if (data.message) {
                    console.log('Registration Message ', data.message)
                } else if (data.key) {
                    localStorage.setItem("key", data.key);
                    dispatch(loginUser(user))
                    return true
                } else {
                    dispatch(errorLogin(data))
                    return false
                }

                return data;
            })
    }
};


export const userLoginFetch = user => {
    console.log('user ', user);
    return dispatch => {
        return fetch(`${api}/login/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    console.log('message in login : ', data.message)
                } else if (data.access) {
                    localStorage.setItem("token", data.access);
                    dispatch(loginUser(user))
                } else if (data.detail) {
                    dispatch(detailMsg(data.detail))
                }

                return data
            })
    }
};

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`${api}/user`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    if (data.message) {
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data))
                    }
                })
                .catch(err => {
                    console.log('Connection error');
                    dispatch(connectionProblem(err))
                })
        }
    }
};




export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

export const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
});

export const detailMsg = detail => ({
    type: 'DETAIL_MSG',
    payload: detail
});

export const errorLogin = msg => ({
    type: 'ERROR_LOGIN',
    payload: msg
});

export const connectionProblem = obj => ({
    type: 'CONNECTION_PROBLEM',
    payload: obj
});
