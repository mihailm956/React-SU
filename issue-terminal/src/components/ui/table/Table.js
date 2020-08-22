import React from 'react';
import MaterialTable from 'material-table';

// export default function MaterialTableDemo() {
//   const [state, setState] = React.useState({
//     columns: columns,
//     data: data
//   });



const Table = ({ columns, data, onRowClick }) => {
    // Use the state and functions returned from useTable to build your UI
    const [state, setState] = React.useState({
        columns: columns,
        data: data
    });

    console.log('STATE COLUMNS', state.columns);
    console.log('STATE', state.data);
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    // } = useTable({
    //     columns,
    //     data,
    // })


  return (
    <MaterialTable
      title="The Money Printer Goes Brrrrrrr"
      columns={state.columns.map(item => {
          console.log('CURRENT ITEM', item);
          const column = {
            title: item.Header,
            field: item.accessor,
          }
          return column;
      })}
      data={state.data}
      editable={{
        // THIS IS THE OTHER ADD BUTTON
        // onRowAdd: (newData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        // THIS IS THE EDIT FUNCTIONALITY
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       if (oldData) {
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data[data.indexOf(oldData)] = newData;
        //           return { ...prevState, data };
        //         });
        //       }
        //     }, 600);
        //   }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
// const Table = ({ columns, data, onRowClick }) => {
//     // Use the state and functions returned from useTable to build your UI
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//     } = useTable({
//         columns,
//         data,
//     })


//     // Render the UI for your table
//     return (
//         <Styles>
//             <table {...getTableProps()}>
//                 <thead>
//                     {headerGroups.map(headerGroup => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map(column => (
//                                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {rows.map((row, rowIndex) => {
//                         prepareRow(row)
//                         return (
//                             <tr {...row.getRowProps()} onClick={() => onRowClick(rowIndex)}>
//                                 {row.cells.map(cell => {
//                                     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                                 })}
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </Styles>
//     )
// }

export default Table