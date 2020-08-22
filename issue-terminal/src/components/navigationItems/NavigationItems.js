import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './navigation-items.module.css';
import NavigationItem from '../navigationItem/NavigationItem'
import getNavigation from '../../utils/navigationPaths';

class NavigationItems extends Component {
    render() {
        let reacablePaths = getNavigation(this.props.isAuthenticated, this.props.userId);

        let linksToNavigate = reacablePaths.map((navElement) => {
            return (
                <NavigationItem link={navElement.link} key={navElement.title}>
                    {navElement.title}
                </NavigationItem>
            )
        })

        return (
            <ul className={style.NavigationItems}>
                {linksToNavigate}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null, 
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(NavigationItems);