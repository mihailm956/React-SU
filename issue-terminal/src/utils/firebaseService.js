const register = (email, password, repassword) => {
    return new Promise(function (resolve, reject) {
        const webAPIKey = 'AIzaSyBO6gFkoT2527y0reqgOFWwNfAALBtdnd8';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;

        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        // dispatch(authStart())
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

                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('userId', data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                resolve(true)
                // dispatch(authSuccess(response.data.idToken, response.data.localId));
                // dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(e => {
                console.log('------err--------');
                console.log(e);
                reject(false)
            })
    });
}

const signIn = (email, password) => {

}


export { register, signIn };