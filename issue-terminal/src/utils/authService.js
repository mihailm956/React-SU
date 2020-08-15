import axios from 'axios';

const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';
const fbAuthUrls = {
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`,
    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`
}

const firebaseAuth = (email, password, firebaseUrl) => {
    return new Promise(function (resolve, reject) {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }


        // fetch(firebaseUrl, {
        //     method: 'POST',
        //     body: JSON.stringify(authData),
        //     headers: {
        //         'Content-Type': "application/json"
        //     }
        // })
        //     .then((response) => {
        //         return response.json()
        //     })
        axios.post(firebaseUrl, authData)
            .then((data) => {
                console.log('[authService] [firebaseAuth] successful');
                console.log(data);
                console.log(data.idToken);

                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('userId', data.localId);
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

const register = (email, password, repassword) => {
    if (password !== repassword) {
        return new Promise((resolve, reject) => reject('passwords dont match'))
    }
    
    return firebaseAuth(email, password, fbAuthUrls.register)
}


const signIn = (email, password) => {
    return firebaseAuth(email, password, fbAuthUrls.signIn)
}


export { register, signIn };