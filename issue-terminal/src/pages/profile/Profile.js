import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

import style from './profile.module.css';
import Spinner from '../../components/ui/spinner/Spinner';
import PageLayout from '../../components/pageLayout/PageLayout';

const ProfilePage = () => {

    const [loading, setLoading] = useState(true);
    const [projectAccess, setProjectAccess] = useState(['No access']);
    const params = useParams();

    useEffect(() => {
        axios.get('https://reactworkshop-663c6.firebaseio.com/projects.json')
            .then(res => {
                const projectAccess = [];


                for (const key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                        const projectData = res.data[key];

                        if (projectData['access'] && projectData['access'][params.id]) {
                            projectAccess.push(key);
                        }
                    }
                }

                console.log(`@@@@@@@@@@@@@@@@@@ `, projectAccess);

                setProjectAccess(oldArray => [projectAccess]);
                setLoading(false)

            })
            .catch(err => console.log(err));

    }, []);



    let profileData = <Spinner />

    if (!loading) {
        profileData = (
            <main>
                <div className={style.Container}>your dbId: {params.id}</div>
                <div className={style.Container}> projectAccess: {projectAccess.join(', ')}</div>
            </main>
        )
    }

    return (
        <PageLayout>
            {profileData}
        </PageLayout >
    )
};

export default ProfilePage;