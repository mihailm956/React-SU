import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import IssuesPage from './pages/Issue/all-issues/IssuesPage';
import SingleIssuePage from './pages/Issue/single-issue/IssuePage';
import NewIssuePage from './pages/Issue/new-issue/NewIssue';
import SignUpPage from './pages/sign-up/SignUp';
import SignInPage from './pages/sign-in/SignIn';

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

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sign-up" component={SignUpPage} />
                    <Route path="/sign-in" component={SignInPage} />
                    <Route path="/issues" exact component={IssuesPage} />
                    <Route path="/issues/new" exact component={NewIssuePage} />
                    <Route path="/issues/:id" component={SingleIssuePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}


export default Navigation;