import axios from 'axios';

const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';
const fbAuthUrls = {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`,
    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`
}

const firebaseAuth = (email, password, firebaseUrl) => {
    return new Promise(function (resolve, reject) {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        axios.post(firebaseUrl, authData)
            .then((response) => {
                console.log('[authService] [firebaseAuth] successful');
                console.log(response.data);
                console.log(response.data.idToken);

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('expirationDate', expirationDate);

                resolve(true)
                // dispatch(authSuccess(response.data.idToken, response.data.localId));
                // dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(e => {
                console.log(e);
                reject(false)
            })
    });
}

const signUp = (email, password, repassword) => {
    if (password !== repassword) {
        return new Promise((resolve, reject) => reject('passwords dont match'))
    }

    return firebaseAuth(email, password, fbAuthUrls.signUp)
}

const signIn = (email, password) => {
    return firebaseAuth(email, password, fbAuthUrls.signIn)
}
const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('autoSignIn');
}

const tryAutoSignIn = () => {
    const token = localStorage.getItem('token');

    if (token) {
        localStorage.setItem('autoSignIn', true);
        console.log("[authService] [tryAutoSignIn] true");
        return true
    }
    
    console.log("[authService] [tryAutoSignIn] false");
    return false;
}

export { signUp, signIn, signOut, tryAutoSignIn };