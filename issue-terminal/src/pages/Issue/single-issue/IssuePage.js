import React, { Component } from 'react'

import PageLayout from '../../../components/pageLayout/PageLayout';
import style from './IssuePage.module.css';

class IssuePage extends Component {
    render() {
        return (
            <PageLayout>
                <main className={style.Container}>
                    Single Issue page
                </main>
            </PageLayout>
        )
    }
}

export default IssuePage;