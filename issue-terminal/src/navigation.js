import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePage from './pages/home/HomePage';

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
                </Switch>
            </BrowserRouter>
        );
    }
}


export default Navigation;