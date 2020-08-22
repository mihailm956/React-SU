import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import style from './issues-page.module.css';
import PageLayout from '../../../components/pageLayout/PageLayout';
import StyledButton from '../../../components/ui/styledButton/StyledButton';
import Spinner from '../../../components/ui/spinner/Spinner';
import Table from '../../../components/ui/table/Table';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class IssuesPage extends Component {
    state = {
        columns: [
            {
                Header: 'Issue',
                accessor: 'issue',
            },
            {
                Header: 'Project',
                accessor: 'project',
            },
            {
                Header: 'CREATED',
                accessor: 'createdDate',
            },
            {
                Header: 'REPORTER',
                accessor: 'reporter',
            },
            {
                Header: 'DUE',
                accessor: 'dueDate',
                // Cell: ({ value }) => (<a onClick={() => { console.log('clicked valuezz', value) }}>Button</a>)
            },
            {
                Header: 'STATUS',
                accessor: 'status',
            },
            {
                Header: 'SEVERITY',
                accessor: 'severity',
            },
            {
                Header: 'IS IT REPRODUCIBLE',
                accessor: 'isItReproducible',
            }
        ]
    }

    selectRowHandler = (rowIndex) => {
        const val = this.props.issues[rowIndex]
        console.log('selectRowHandler: ', rowIndex);
        console.log('selectRowHandler: ', val.dbId);
        if (this.props.isAuthenticated) {
            this.props.history.push(`/issues/${val.dbId}`);
        }
    }

    submitNewBugHandler = () => {
        console.log('submit new issue');
        if (this.props.isAuthenticated) {
            this.props.history.push(`/issues/new`);
        }
    }

    componentDidMount() {
        this.props.fetchAllAuthorizedIssues(this.props.token, this.props.userId);
    }

    render() {
        let table = <Spinner />

        if (!this.props.loading) {
            table = <Table columns={this.state.columns} data={this.props.issues} onRowClick={this.selectRowHandler} />
        }
        return (
            <PageLayout>
                <main className={style.Container}>
                    <div className={style.ButtonContainer}>
                        <StyledButton clicked={this.submitNewBugHandler} title="Register" btnType="Success">Submit New Issue</StyledButton>
                    </div>
                    {table}
                </main>
            </PageLayout >
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.userEmail,
        issues: state.issue.issues,
        loading: state.issue.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAuthorizedIssues: (token, userId) => dispatch(actions.fetchAllAuthorizedIssues(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IssuesPage));