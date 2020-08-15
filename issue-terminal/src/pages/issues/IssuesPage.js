import React, { Component } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { withRouter } from "react-router-dom";

import makeData from '../../utils/dummyData'
import PageLayout from '../../components/pageLayout/PageLayout';
import style from './IssuesPage.module.css';
import StyledButton from '../../components/ui/styledButton/StyledButton';

const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    

    tr {
       
      :last-child { 
        td {
          border-bottom: 0;
        }
      }
      :nth-child(even) {background-color: #f2f2f2;}
      :hover { background-color: #bbb; }
    }

    th {
        border-bottom: 1px solid black;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      cursor: pointer;

      :last-child {
        border-right: 0;
        
      }

      
    }
  }
`

function Table({ columns, data, onRowClick }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })


    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={() => onRowClick(rowIndex)}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

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
                    <Styles>
                        <Table columns={this.state.columns} data={this.state.data} onRowClick={this.selectRowHandler} />
                    </Styles>
                </main>
            </PageLayout >
        )
    }
}

export default withRouter(App)
