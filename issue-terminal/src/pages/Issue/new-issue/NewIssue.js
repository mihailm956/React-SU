import React, { Component } from 'react'

import PageLayout from '../../../components/pageLayout/PageLayout';
import SubmitForm from '../../../components/ui/forms/submit/SubmitForm';

import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

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
        console.log('userEmail', this.props.email);
        console.log('userId', this.props.userId);

        const issueData = {
            issueName: event.target.elements.name.value,
            issueCreated: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            issueDueDate: event.target.elements.dueDate.value,
            issueSeverity: event.target.elements.severity.value,
            issueReproducible: event.target.elements.reproducible.value,
            issueDetails: event.target.elements.details.value,
            userEmail: this.props.email,
            userId: this.props.userId
        }

        console.log(`[Register Issue] [NewIssue] [formDataHandler]`);
        this.props.onCreateIssue(issueData, this.props.token);
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


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.userEmail,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCreateIssue: (issueData, token) => dispatch(actions.createIssue(issueData, token)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssue);