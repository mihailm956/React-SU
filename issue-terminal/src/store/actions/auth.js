import axios from 'axios';

import * as actionTypes from './actionsTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        userEmail: email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;

        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`
        }

        axios.post(url, authData)
            .then(response => {
                console.log('[store] [actions] [auth] successful axios login/signup with fb');
                console.log('[store] [actions] [auth] isSignUp = ' + isSignUp);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('email', email)
                console.log('!!!! CHECK IF VALID !!!!!  response.data.email', email)
                console.log('!!!! CHECK IF VALID !!!!!  response.data.email', response.data.email)

                if (isSignUp) {
                    saveUserDataInDB(response.data.localId, email)
                        .then(() => {
                            console.log(`[store actiob auth] AFTER successful stored user id in db`);
                            dispatch(authSuccess(response.data.idToken, response.data.localId, email));
                            dispatch(checkAuthTimeout(response.data.expiresIn))
                        })
                        .catch(err => dispatch(authFail(err)))
                }
                else {
                    dispatch(authSuccess(response.data.idToken, response.data.localId, email));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                }
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

const saveUserDataInDB = (id, email) => {
    return new Promise((resolve, reject) => {
        let url = `https://reactworkshop-663c6.firebaseio.com/accounts/${id}.json`;
        let data = { email }

        axios.post(url, data)
            .then(result => {
                console.log(`[store actiob saveUserIdInDB] successful stored user id in db`);
                resolve();
            })
            .catch(err => reject(err))
    })
}

const continueWithAuthSuccess = (response, email) => {
    return dispatch => {

        dispatch(authSuccess(response.data.idToken, response.data.localId, email));
        dispatch(checkAuthTimeout(response.data.expiresIn))
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    console.log('[store] [actions] [authCheckState] start');
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                console.log('[store] [actions] [authCheckState] successful auto sign in');
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userId, email))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
};