import React, { Component } from 'react'

import style from './home-page.module.css';
import PageLayout from '../../components/pageLayout/PageLayout';

class homePage extends Component {
    render() {
        return (
            <PageLayout>
                <div>Home Page</div>
            </PageLayout>
        )
    }
}

export default homePage;