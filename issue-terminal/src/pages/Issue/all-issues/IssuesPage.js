import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import style from './issues-page.module.css';
import makeData from '../../../utils/dummyData'
import PageLayout from '../../../components/pageLayout/PageLayout';
import StyledButton from '../../../components/ui/styledButton/StyledButton';
import Table from '../../../components/ui/table/Table';


class App extends Component {
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
        this.props.history.push(`/issues/new`);
    }

    render() {
        return (
            <PageLayout>
                <main className={style.Container}>
                    <div className={style.ButtonContainer}>
                        <StyledButton clicked={this.submitNewBugHandler} title="Register" btnType="Success">Submit New Issue</StyledButton>
                    </div>
                    <Table columns={this.state.columns} data={this.state.data} onRowClick={this.selectRowHandler} />
                </main>
            </PageLayout >
        )
    }
}

export default withRouter(App)