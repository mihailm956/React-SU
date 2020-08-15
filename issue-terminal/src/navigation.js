import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import IssuesPage from './pages/issues/IssuesPage';
import SingleIssuePage from './pages/singleIssue/IssuePage';
import NewIssuePage from './pages/newIssue/NewIssue';
import RegisterPage from './pages/register/Register';
import LogInPage from './pages/login/LogIn';

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
                    <Route path="/login" component={LogInPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/issues" exact component={IssuesPage} />
                    <Route path="/issues/new" exact component={NewIssuePage} />
                    <Route path="/issues/:id" component={SingleIssuePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}


export default Navigation;