import React, { Fragment } from 'react'

import Logo from '../../logo/Logo';
import NavigationItems from '../../navigationItems/NavigationItems';
import classes from './side-drawer.module.css';
import Backdrop from '../../ui/backdrop/Backdrop';

const sideDrawer = (props) => {
    let attackedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attackedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attackedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;