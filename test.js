// import axios from 'axios';
const axios = require('axios')

const arr = () => {

    const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;

    // if (!isSignUp) {
    //     url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`;
    // }

    const authData = {
        email: 'test@abv.bg',
        password: '123456',
        returnSecureToken: true
    }

    axios.post(url, authData)
        .then((response) => {
            console.log('Successfull register/login');
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })

}

arr();