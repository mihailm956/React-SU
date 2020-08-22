import React, { Component } from 'react'

import PageLayout from '../../../components/pageLayout/PageLayout';
import SubmitForm from '../../../components/ui/forms/submit/SubmitForm';
import Spinner from '../../../components/ui/spinner/Spinner';

import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';

class NewIssue extends Component {
    state = {
        loading: true,
        projectAccess: '',
        calledOnce: false
    }

    componentDidMount() {
        console.log(`[NewIssue] [componentDidMount] start`);
        this.setState({ loading: true })
        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"'
        // const queryParams = '?auth=' + this.props.token + '&orderBy="email"&equalTo="' + this.props.email + '"'
        axios.get('https://reactworkshop-663c6.firebaseio.com/projects.json')
            .then(res => {
                let access = [];

                for (const projectName in res.data) {
                    if (res.data.hasOwnProperty(projectName)) {
                        const projectData = res.data[projectName];

                        if (projectData['access'] && projectData['access'][this.props.userId]) {
                            console.log(`[new-issue] [componentDidMount] ${projectName} accesssable`);
                            access.push(projectName);
                        }
                        else {
                            console.log(`[new-issue] [componentDidMount] ${projectName} unauthorized`);
                        }
                    }
                }

                this.setState({
                    loading: false,
                    projectAccess: access
                })
            })
            .catch(err => {
                console.log(`[new-issue] [componentDidMount] projectAccess: something went wrong:`, err);
            })
    }


    formDataHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log('event.target', event.target);
        console.log('formData', formData);
        console.log('selectedProject', event.target.elements.selectedProject.value);
        console.log('name', event.target.elements.name.value);
        console.log('dueDate', event.target.elements.dueDate.value);
        console.log('severity', event.target.elements.severity.value);
        console.log('reproducible', event.target.elements.reproducible.value);
        console.log('details', event.target.elements.details.value);
        console.log('userEmail', this.props.email);
        console.log('userId', this.props.userId);

        const issueData = {
            issueProject: event.target.elements.selectedProject.value,
            issueName: event.target.elements.name.value,
            issueCreated: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
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
        let form = <Spinner />;

        if (!this.state.loading && !this.props.loading) {
            form = <SubmitForm submitHandler={this.formDataHandler} options={this.state.projectAccess} />;
        }

        let authRedirect = null;
        // if (this.props.uploadingIssueToDbCompleted && !this.state.calledOnce) {
        //     this.setState({ calledOnce: true })
        //     console.log('------------------this.props.newIssueRedirectPath = ' + this.props.newIssueRedirectPath);
        //     authRedirect = <Redirect to="/issues" />
        //     //     authRedirect = <Redirect to={this.props.newIssueRedirectPath} />
        // }

        return (
            <PageLayout>
                {authRedirect}
                <main >
                    {form}
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
        loading: state.issue.loading,
        uploadingIssueToDbCompleted: state.issue.uploadingIssueToDbCompleted,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCreateIssue: (issueData, token) => dispatch(actions.createIssue(issueData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssue);