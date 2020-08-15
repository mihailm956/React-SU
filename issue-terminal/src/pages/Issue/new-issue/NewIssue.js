import React, { Component } from 'react'

import PageLayout from '../../../components/pageLayout/PageLayout';
import SubmitForm from '../../../components/ui/forms/submit/SubmitForm';

class NewIssue extends Component {
    formDataHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('event.target', event.target);
        console.log('formData', formData);
        console.log('name', event.target.elements.name.value);
        console.log('name', event.target.elements.dueDate.value);
        console.log('severity', event.target.elements.severity.value);
        console.log('reproducible', event.target.elements.reproducible.value);
        console.log('details', event.target.elements.details.value);
        //event target.elements.name.value
    }

    render() {
        return (
            <PageLayout>
                <main >
                    <SubmitForm submitHandler={this.formDataHandler} />
                </main>
            </PageLayout>
        )
    }
}

export default NewIssue;