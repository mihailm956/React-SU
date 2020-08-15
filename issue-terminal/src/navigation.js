import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import IssuesPage from './pages/Issue/all-issues/IssuesPage';
import SingleIssuePage from './pages/Issue/single-issue/IssuePage';
import NewIssuePage from './pages/Issue/new-issue/NewIssue';
import SignUpPage from './pages/sign-up/SignUp';
import SignInPage from './pages/sign-in/SignIn';
import SignOutPage from './pages/sign-out/SignOut';

class Navigation extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer });
    }

    render() {
        console.log('[navigation] this.props.signedIn = ' + this.props.signedIn);
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sign-up" component={SignUpPage} />
                    <Route path="/sign-in" component={SignInPage} />
                    <Route path="/sign-out" component={SignOutPage} />
                    <Route path="/issues" exact component={IssuesPage} />
                    <Route path="/issues/new" exact >
                        {this.props.signedIn ? (<NewIssuePage />) : (<Redirect to="/issues" />)}
                    </Route>
                    <Route path="/issues/:id" component={SingleIssuePage} >
                        {this.props.signedIn ? (<SingleIssuePage />) : (<Redirect to="/issues" />)}
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}


export default Navigation;