import React from 'react';
import { useTable } from 'react-table'

import PageLayout from '../../components/pageLayout/PageLayout';

function IssuesPage() {
    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
                id: "FBase#111",
            },
            {
                col1: 'react-table',
                col2: 'rocks',
                id: "FBase#222",
            },
            {
                col1: 'whatever',
                col2: 'you want',
                id: "FBase#333",
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            // {
            //     Header: 'Column 2',
            //     accessor: 'col2',
            // },
            {
                Header: 'Column 3',
                accessor: 'id',
                // Cell: ({ value }) => (<a onClick={() => { console.log('clicked valuezz', value) }}>Button</a>)
            },
        ],
        []
    )

    // {() => {console.log('clicked valuezz')}}

    const onRowClick = ({ cellData, id }) => {
        console.log('clicked with id: ', id);
        console.log('clicked with data: ', cellData);
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const btn = (<button>ASDdddd</button>)
    const selectRowHandler = (rowIndex) => {
        const val = data[rowIndex]
        console.log('selectRowHandler: ', rowIndex);
        console.log('selectRowHandler: ', val.id);
    }

    return (
        <PageLayout>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={() => selectRowHandler(rowIndex)}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {/* onClick={() => onRowClick(cell)} */}
                                        <button onClick={() => onRowClick({ cellData: cell, id: cell.row.original.id })}> asd </button>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </PageLayout>
    )
}

export default IssuesPage