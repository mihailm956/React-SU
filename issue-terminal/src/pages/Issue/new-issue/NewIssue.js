import React, { Component } from 'react'
import PageLayout from '../../../components/pageLayout/PageLayout';
import SubmitForm from '../../../components/ui/forms/submit/SubmitForm';
import Spinner from '../../../components/ui/spinner/Spinner';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


class NewIssue extends Component {
    state = {
        loading: true,
        projectAccess: ''
    }

    componentDidMount() {
        this.setState({ loading: true })
        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"'
        // const queryParams = '?auth=' + this.props.token + '&orderBy="email"&equalTo="' + this.props.email + '"'
        axios.get('https://reactworkshop-663c6.firebaseio.com/accounts.json' + queryParams)
            .then(res => {
                // const projectAccess = res.data.projectAccess.split(", ");
                const projectAccess = [];
                for (const key in res.data) {
                    projectAccess.push({
                        ...res.data[key],
                        id: key
                    });
                }

                let access = '';
                if (projectAccess[0] && projectAccess[0].projectAccess) {
                    access = projectAccess[0].projectAccess.split(', ');
                    console.log(`[new-issue] [componentDidMount] user has access to : `, access);
                };

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
        console.log('name', event.target.elements.dueDate.value);
        console.log('severity', event.target.elements.severity.value);
        console.log('reproducible', event.target.elements.reproducible.value);
        console.log('details', event.target.elements.details.value);
        console.log('userEmail', this.props.email);
        console.log('userId', this.props.userId);
        let validForm = true;

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

        if(issueData.issueProject === 'DEFAULT' || !issueData.issueProject){
            toast.error("ERROR: Could not save data, Select your Project...", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        } else if(!issueData.issueName){
            toast.error("ERROR: Could not save data, Submit Issue Title...", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        } else if(!issueData.issueDueDate){
            toast.error("ERROR: Could not save data, Make sure that you have a valid Due Date...", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        } else if(!issueData.issueSeverity){
            toast.error("ERROR: Could not save data, Choose severity of the issue.", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        } else if(!issueData.issueReproducible){
            toast.error("ERROR: Could not save data, Issue Reproducibility was not selected", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        } else if(!issueData.issueDetails){
            toast.error("ERROR: Could not save data, Description filed is mandatory..", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        }
        

        console.log(`[Register Issue] [NewIssue] [formDataHandler]`);
        if(validForm){
            this.props.onCreateIssue(issueData, this.props.token);
             toast.success("Congratulations you create New Issuee...", {
                position: toast.POSITION.TOP_RIGHT });
        }
    }


    render() {
        let form = <Spinner />;

        if (!this.state.loading) {
            form = <SubmitForm submitHandler={this.formDataHandler} options={this.state.projectAccess} />;
        }


        return (
            <PageLayout>
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
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCreateIssue: (issueData, token) => dispatch(actions.createIssue(issueData, token)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssue);