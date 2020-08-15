import React, { Component } from 'react'

import PageLayout from '../../components/pageLayout/PageLayout';
import StyledButton from '../../components/ui/forms/submit-issue-two/SubmitIssue';

class NewIssue extends Component {
    render() {
        console.log('test');
        return (
            <PageLayout>
                <main >
                    <StyledButton></StyledButton>
                </main>
            </PageLayout>
        )
    }
}

export default NewIssue;