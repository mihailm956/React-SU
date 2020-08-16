import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import style from './issues-page.module.css';
import makeData from '../../../utils/dummyData'
import PageLayout from '../../../components/pageLayout/PageLayout';
import StyledButton from '../../../components/ui/styledButton/StyledButton';
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
        ],
        data: makeData(20)
    }



    selectRowHandler = (rowIndex) => {
        const val = this.state.data[rowIndex]
        console.log('selectRowHandler: ', rowIndex);
        console.log('selectRowHandler: ', val.dbId);
        this.props.history.push(`/issues/${val.dbId}`);
    }

    submitNewBugHandler = () => {
        console.log('submit new issue');
        this.props.history.push(`/issues/new`);
    }

    componentDidMount() {
        this.props.fetchAllIssues(this.props.token, this.props.userId);
    }

    render() {

        console.log('-----------data ', this.state.data);
        console.log('-----------this.props.issues ', this.props.issues);

        return (
            <PageLayout>
                <main className={style.Container}>
                    <div className={style.ButtonContainer}>
                        <StyledButton clicked={this.submitNewBugHandler} title="Register" btnType="Success">Submit New Issue</StyledButton>
                    </div>
                    <Table columns={this.state.columns} data={this.props.issues} onRowClick={this.selectRowHandler} />
                </main>
            </PageLayout >
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.userEmail,
        issues: state.issue.issues
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllIssues: (token, userId) => dispatch(actions.fetchAllIssues(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IssuesPage));