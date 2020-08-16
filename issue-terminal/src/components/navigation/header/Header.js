import React from 'react';

import Logo from '../../logo/Logo';
import style from './header.module.css';
import NavigationItems from '../../navigationItems/NavigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/DrawerToggle';

const Header = (props) => {
    return (
        <header className={style.Header}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className={style.Logo}>
                <Logo />
            </div>
            <nav className={style.DesktopOnly}>
                {/* <NavigationItems isAuthenticated={props.isAuth} /> */}
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Header;
