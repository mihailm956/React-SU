import React from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'

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

const Table = ({ columns, data, onRowClick }) => {
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
        <Styles>
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
        </Styles>
    )
}

export default Table