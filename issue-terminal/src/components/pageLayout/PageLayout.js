import React, { Component } from 'react';

import Header from '../../components/navigation/header/Header';
import SideDrawer from '../navigation/sideDrawer/SideDrawer';
import style from './page-layout.module.css';

class PageLayout extends Component {
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
            <div>
                <Header
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <div className={style.container}>
                    {this.props.children}
                </div>
            </div >
        );
    }
}

export default PageLayout;
