import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import HomePage from './pages/home/homePage';
import IssuesPage from './pages/Issue/all-issues/IssuesPage';
import SingleIssuePage from './pages/Issue/single-issue/IssuePage';
import NewIssuePage from './pages/Issue/new-issue/NewIssue';
import SignUpPage from './pages/sign-up/SignUp';
import SignInPage from './pages/sign-in/SignIn';
import SignOutPage from './pages/sign-out/SignOut';
import ProfilePage from './pages/profile/Profile';
import ErrorPage from './pages/error/ErrorPage';
import AdminPage from './pages/admin/AdminPage';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class Navigation extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sign-up" component={SignUpPage} />
                    <Route path="/sign-in" component={SignInPage} />
                    <Route path="/sign-out" component={SignOutPage} />
                    <Route path="/issues" exact component={IssuesPage} />
                    <Route path="/issues/new" exact component={NewIssuePage} />
                    <Route path="/issues/:id" component={SingleIssuePage} >
                        {this.props.isAuthenticated ? (<SingleIssuePage />) : (<Redirect to="/issues" />)}
                    </Route>
                    <Route path="/profile/:id" component={ProfilePage} ></Route>
                    <Route path="/admin" component={AdminPage} ></Route>
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};


export default (connect(mapStateToProps, mapDispatchToProps)(Navigation));