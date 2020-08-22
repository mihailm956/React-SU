// import axios from 'axios';
// // const axios = require('axios')

// const auth = (isSignUp) => {

//     const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';

//     let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;

//     if (!isSignUp) {
//         url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`;
//     }

//     const authData = {
//         email: 'test@abv.bg',
//         password: '123456',
//         returnSecureToken: true
//     }

//     axios.post(url, authData)
//         .then((response) => {
//             console.log('Successfull register/login');
//             console.log(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         })

// }

// auth(true);



const authFetch = (isSignUp) => {

    const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;

    // if (!isSignUp) {
    //     url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`;
    // }

    const authData = {
        email: 'test23@abv.bg',
        password: '123456',
        returnSecureToken: true
    }

    console.log('------1--------');
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(authData),
        headers: {
            'Content-Type': "application/json"
        }
    })
        .then((response) => {
            console.log('------2--------');
            return response.json()
        })
        .then((data) => {
            console.log('------3--------');
            console.log(data);
            console.log(data.idToken);

            if (!isSignUp) {
                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('userId', data.localId);
                localStorage.setItem('expirationDate', expirationDate);
            }

        })
        .catch(e => {
            console.log('------err--------');
            console.log(e);
        })

}

const tryAutoLogIn = () => {
    let successfulAutoLogIn = false;
    const token = localStorage.getItem('token');

    if (!token) {
        logout('[tryAutoLogIn] missing token');
    }
    else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            logout('[tryAutoLogIn] token was expired');
        }
        else {
            successfulAutoLogIn = true;
            console.log('[tryAutoLogIn] successful');
            const userId = localStorage.getItem('userId');
            authSuccess(token, userId)
            checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
        }
    }
    
    return successfulAutoLogIn;
}

const logout = (msg = '') => {
    console.log('[logout]  reason: ' + msg);
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId');
}

const authSuccess = (token, userId) => {
    console.log('[authSuccess] token = ' + token);
    console.log('[authSuccess] userId = ' + userId);
}

const checkAuthTimeout = (expirationTime) => {
    console.log('[checkAuthTimeout] started timer for token expiration');
    setTimeout(() => {
        logout('[checkAuthTimeout] checkAuthTimeout');
    }, expirationTime * 1000);
}


const scenario = () => {
    console.log('[scenario] enter');
    const isAutoLoggedIn = tryAutoLogIn();

    if (isAutoLoggedIn) {
        console.log('---[scenario] token existed and was not expired');
    }
    else {
        console.log('---[scenario] missing token or expired, need to provide logIn data');
        authFetch(false);
    }
}

scenario();