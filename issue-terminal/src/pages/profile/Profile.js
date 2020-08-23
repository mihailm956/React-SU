import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import style from './profile.module.css';
import StyledButton from '../../components/ui/styledButton/StyledButton';
import PageLayout from '../../components/pageLayout/PageLayout';

const ProfilePage = () => {
    const params = useParams();
    console.log(params);

    return (
        <PageLayout>
            <main className={style.Container}>
                <div className={style.ButtonContainer}>
                    {params.id}
                </div>
            </main>
        </PageLayout >
    )
};

export default ProfilePage;