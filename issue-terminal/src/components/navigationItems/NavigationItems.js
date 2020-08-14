import React from 'react';

import classes from './navigation-items.module.css';
import NavigationItem from '../navigationItem/NavigationItem'
import getNavigation from '../../utils/navigationPaths';

const navigationItems = (props) => {
    const links = getNavigation(props.isAuthenticated);

    return (
        <ul className={classes.NavigationItems}>
            {
                links.map((navElement) => {
                    return (
                        <NavigationItem link={navElement.link} key={navElement.title}>
                            {navElement.title}
                        </NavigationItem>
                    )
                })
            }
        </ul>
    )
};

export default navigationItems;