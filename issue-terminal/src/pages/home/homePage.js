import React, { Component } from 'react'

import Header from '../../components/navigation/header/Header';
import style from './home-page.module.css';

class homePage extends Component {
    render() {
        return (
            <div>
                {/* {this.props.children} */}
                <Header />
                <main className={style.Container}>
                    HomePage
                </main>
            </div>
        )
    }
}

export default homePage;