import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactworkshop-663c6.firebaseio.com/'
});

export default instance;
