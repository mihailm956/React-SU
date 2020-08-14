const ReactTable = window.ReactTable.default

const columns = [{
  Header: 'Name',
  columns: [{
    Header: 'First Name',
    accessor: 'firstName'
  }, {
    Header: 'Last Name',
    id: 'lastName',
    accessor: d => d.lastName
  }]
}, {
  Header: 'Info',
  columns: [{
    Header: 'Age',
    accessor: 'age'
  }]
}]

const sub_columns = columns.slice(0)
sub_columns.push({
		id: 'button',
		accessor: 'firstName',
		Cell: ({value}) => (<a onClick={()=>{console.log('clicked value', value)}}>Button</a>)
})

console.log('sub columns: ', sub_columns, columns);

const MyTable = (props) => {
	return (
		<div>
			<ReactTable
				data={makeData()}
				columns={columns}
				SubComponent={(row) => {
					return (
						<div>
							<ReactTable
								data={makeData()}
								columns={sub_columns}
								showPagination={false}
								pageSize={3}
								/>
						</div>
					)
				}}
			/>
			<br />
			<br />
			<h1>For more examples, <a href="https://react-table.js.org" target="_blank">see our react storybook</a></h1>
		</div>
	)
}

ReactDOM.render(<MyTable />, document.getElementById('root'))

