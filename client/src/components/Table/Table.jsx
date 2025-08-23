import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Table.css';
import PropTypes from 'prop-types';
import { UilPen } from '@iconscout/react-unicons';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '../../features/transactionState/transactionStateSlice';
import EditTransactionDialog from '../EditTransactionDialog/EditTransactionDialog';

const makeStyle = (type) => {
	if (type === 'income') {
		return {
			background: '#03DAC5',
			color: 'white'
		};
	} else if (type === 'expense') {
		return {
			background: '#BB86FC',
			color: 'white'
		};
	}
};

export default function BasicTable({ rows }) {
	const [selectedToEdit, setSelectedToEdit] = React.useState({});
	const handleSelectedToEdit = ({
		defaultName,
		defaultAmount,
		defaultCategory,
		defaultDate,
		transactionId
	}) => {
		setSelectedToEdit({
			defaultName,
			defaultAmount,
			defaultCategory,
			defaultDate,
			transactionId
		});
	};
	const dispatch = useAppDispatch();
	const handleModal = (transactionId) => {
		dispatch(openModal());
	};

	return (
		<div className="Table">
			<EditTransactionDialog defaultData={selectedToEdit} />
			<h3>Recent Transactions</h3>
			{rows && rows.length > 0 ? (
				<TableContainer
					component={Paper}
					className="tableContainer"
					style={{
						boxShadow: '0px 13px 20px 0px #80808029',
						maxHeight: '15rem'
						// maxWidth: '100%'
					}}
				>
					<Table
						style={{ minWidth: 650, maxHeight: '10rem', backgroundColor: '#616161' }}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								<TableCell style={{ color: 'white' }}>Transaction Name</TableCell>
								<TableCell style={{ color: 'white' }}>Amount</TableCell>
								<TableCell style={{ color: 'white' }} align="left">
									Date
								</TableCell>
								<TableCell style={{ color: 'white' }} align="left">
									Transaction Type
								</TableCell>
								<TableCell style={{ color: 'white' }} align="left">
									Category
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody style={{ color: 'white' }}>
							{rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell style={{ color: 'white' }} component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell style={{ color: 'white' }} align="left">
										{row.amount}
									</TableCell>
									<TableCell style={{ color: 'white' }} align="left">
										{row.date}
									</TableCell>
									<TableCell style={{ color: 'white' }} align="left">
										<span className="status" style={makeStyle(row.type)}>
											{row.type}
										</span>
									</TableCell>
									<TableCell style={{ color: 'white' }} align="left">
										{row.category}
									</TableCell>
									<TableCell sx={{ color: 'white' }} align="left">
										<UilPen
											onClick={() => {
												handleSelectedToEdit({
													defaultName: row.name,
													defaultAmount: row.amount,
													defaultCategory: row.category,
													defaultDate: row.date,
													transactionId: row.transactionId
												});
												handleModal(row.transactionId);
											}}
											size="1.5rem"
											color="white"
											cursor="pointer"
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<span>No Records Found</span>
			)}
		</div>
	);
}
BasicTable.propTypes = {
	rows: PropTypes.array
};
