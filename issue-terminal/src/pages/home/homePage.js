import React, { Component } from 'react'

import style from './home-page.module.css';
import PageLayout from '../../components/pageLayout/PageLayout';
import imgLogo from '../../assets/images/Logo.png';
import IconAccess from '../../assets/images/IconAccess.png';
import IconDate from '../../assets/images/IconDate.png';
import IconEdit from '../../assets/images/IconEdit.png';
import IconNewPage from '../../assets/images/IconNewPage.png';

class HomePage extends Component {
    render() {
        return (
            <PageLayout>
                <main>
                    <div className={style.Container}>
                        <img src={imgLogo} alt="Issue-Terminal" />
                        BugTracer is an issue tracker that provides a delicate balance between simplicity and power.
                        <br/>
                        <br/>
                        <br/>
                        <div></div>
                        <div className={style.MultipleContainers}>
                            <div className={style.Advantages}>
                                <img src={IconAccess} alt="Issue-Terminal" />
                                Specify who has access to what
                            </div>
                            <div className={style.Advantages}>
                                <img src={IconDate} alt="Issue-Terminal" />
                                Notify if bug is dueDate
                            </div>
                            <div className={style.Advantages}>
                                <img src={IconEdit} alt="Issue-Terminal" />
                                Easily edit ongoing bugs
                            </div>
                        </div>
                    </div>
                </main>
            </PageLayout>
        )
    }
}

export default HomePage;