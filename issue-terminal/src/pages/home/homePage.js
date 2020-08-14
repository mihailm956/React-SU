import React, { Component } from 'react'

import style from './home-page.module.css';
import PageLayout from '../../components/pageLayout/PageLayout';

class homePage extends Component {
    render() {
        return (
            <PageLayout>
                <main className={style.Container}>
                    HomePage
                </main>
            </PageLayout>
        )
    }
}

export default homePage;