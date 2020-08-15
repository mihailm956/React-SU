import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signOut } from '../../utils/authService';

class SignOut extends Component {
    componentDidMount() {
        signOut();
    }

    render() {
        return (<Redirect to="/" />)
    }
}

export default SignOut;