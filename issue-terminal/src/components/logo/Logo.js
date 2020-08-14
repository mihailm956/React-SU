import React from 'react'

import imgLogo from '../../assets/images/Logo.png';
import style from './logo.module.css';

const logo = (props) => (
    <div className={style.Logo} style={{ height: props.height }}>
        <img src={imgLogo} alt="Issue-Terminal" />
    </div>
);

export default logo;