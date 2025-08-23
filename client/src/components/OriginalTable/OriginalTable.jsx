import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './OriginalTable.css';

function createData(name, trackingId, date, status) {
	return { name, trackingId, date, status };
}

const rows = [
	createData('Lasania Chiken Fri', 18908424, '2 March 2022', 'Approved'),
	createData('Big Baza Bang ', 18908424, '2 March 2022', 'Pending'),
	createData('Mouth Freshner', 18908424, '2 March 2022', 'Approved'),
	createData('Cupcake', 18908421, '2 March 2022', 'Delivered')
];

const makeStyle = (status) => {
	if (status === 'Approved') {
		return {
			background: 'rgb(145 254 159 / 47%)',
			color: 'green'
		};
	} else if (status === 'Pending') {
		return {
			background: '#ffadad8f',
			color: 'red'
		};
	} else {
		return {
			background: '#59bfff',
			color: 'white'
		};
	}
};

export default function OriginalTable() {
	return (
		<div className="Table">
			<h3>Recent Orders</h3>
			<TableContainer
				component={Paper}
				style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
			>
				<Table style={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="left">Tracking ID</TableCell>
							<TableCell align="left">Date</TableCell>
							<TableCell align="left">Status</TableCell>
							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody style={{ color: 'white' }}>
						{rows.map((row) => (
							<TableRow
								key={row.name}
							>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="left">{row.trackingId}</TableCell>
								<TableCell align="left">{row.date}</TableCell>
								<TableCell align="left">
									<span className="status" style={makeStyle(row.status)}>
										{row.status}
									</span>
								</TableCell>
								<TableCell align="left" className="Details">
									Details
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
