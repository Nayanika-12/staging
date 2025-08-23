import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './NewTable.css';
import { Button } from '@material-ui/core';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategoryBudget } from '../../features/transactionState/transactionStateSlice';
import { useEffect } from 'react';
import { deleteBudgetDataApi } from '../../api/apiCalls';

const makeStyle = (type) => {
	if (type === 'delete') {
		return {
			background: '#f1807d',
			color: 'black'
		};
		// } else if (type === 'expense') {
		// 	return {
		// 		background: '#BB86FC',
		// 		color: 'black'
		// 	};
	}
};

export default function BasicTable() {
	const token = localStorage.getItem('token');
	const [rows, setRows] = React.useState([]);
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.transactionState.categories);
	const budgetData = useAppSelector(
		(state) => state.transactionState.categoryWiseBudget
	);
	useEffect(() => {
		const tableRows = budgetData.map((item) => {
			const category = categories.find((cat) => cat.id === item.categoryId);
			return {
				categoryId: item.categoryId,
				categoryName: category ? category.value : '',
				categoryBudget: item.budget,
				amountSpent: item.amountSpent
			};
		});
		setRows(tableRows);
	}, [budgetData, categories]);

	const handleDelete = (categoryId) => async () => {
		await deleteBudgetDataApi(token, categoryId);
		dispatch(deleteCategoryBudget(categoryId));
	};
	return (
		<div style={{ marginLeft: '0.6rem' }}>
			<div className="Table">
				<h4>Category-wise Budget Table:</h4>
				<br />
				{rows && rows.length > 0 ? (
					<TableContainer
						component={Paper}
						style={{
							boxShadow: '0px 90px 20px 0px #0000000d',
							maxHeight: '20rem'
						}}
					>
						<Table
							style={{ minWidth: 650, maxHeight: '15rem', backgroundColor: '#544d4d' }}
						>
							<TableHead>
								<TableRow>
									<TableCell style={{ color: 'white' }}>Category</TableCell>
									<TableCell style={{ color: 'white' }}>Budget</TableCell>
									<TableCell style={{ color: 'white' }}>Amount Spent</TableCell>
									<TableCell style={{ color: 'white' }} align="left">
										Delete
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody style={{ color: 'white' }}>
								{rows.map((row) => (
									<TableRow key={row.categoryId}>
										<TableCell style={{ color: 'white' }} component="th" scope="row">
											{row.categoryName}
										</TableCell>
										<TableCell style={{ color: 'white' }} align="left">
											{row.categoryBudget}
										</TableCell>
										<TableCell style={{ color: 'white' }} align="left">
											{row.amountSpent}
										</TableCell>
										<TableCell style={{ color: 'white' }} align="left" className="cursor">
											<Button style={{ backgroundColor: '#E65065', color: 'white ', fontSize: '0.7rem' }} onClick={handleDelete(row.categoryId)}>
												<UilTrashAlt />
											</Button>
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
		</div>
	);
}
