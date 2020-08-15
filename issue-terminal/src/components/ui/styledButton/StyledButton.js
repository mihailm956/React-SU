import React from 'react'
import style from './styledButton.module.css';

const button = (props) => (
    <div className={style["multi-button"]}>
    <button
        disabled={props.disabled}
        className={[style["paste"], style[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}
    </button>
    </div>

);

export default button;