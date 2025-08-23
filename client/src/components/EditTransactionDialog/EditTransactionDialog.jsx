import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { motion } from 'framer-motion';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import {
	closeModal,
	deleteTransaction,
	editTransaction
} from '../../features/transactionState/transactionStateSlice';
import './EditTransactionDialog.css';
import { deleteTransactionApi, updateTransactionApi } from '../../api/apiCalls';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function EditTransactionDialog({ defaultData }) {
	console.log(defaultData.defaultCategory);
	//redux
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.transactionState.showEditModal);
	const categories = useAppSelector(
		(state) => state.transactionState.categories
	);
	// var modalData = useAppSelector(
	// 	(state) => state.transactionState.editModalData
	// );

	//handling input
	const categoryData = [...categories];
	const categoriesToShow = categoryData.map((category) => category.value);
	const [editName, setEditName] = React.useState('');
	const [editAmount, setEditAmount] = React.useState(0);
	const [editCategory, setEditCategory] = React.useState();
	const [editDate, setEditDate] = React.useState();

	React.useEffect(() => {
		setEditName(defaultData.defaultName);
		setEditAmount(defaultData.defaultAmount);
		setEditCategory(defaultData.defaultCategory);
		setEditDate(defaultData.defaultDate);
	}, [defaultData]);
	const handleEditName = (e) => {
		setEditName(e.target.value);
	};
	const handleEditAmount = (e) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
		e.target.value = onlyNumbers;
		setEditAmount(e.target.value);
	};
	const handleEditCategory = (e) => {
		setEditCategory(e.target.value);
	};
	const handleEditDate = (e) => {
		setEditDate(e.target.value);
	};
	const currDate = new Date();
	const prevSixMonthDate = new Date(currDate.setMonth(currDate.getMonth() - 5));
	const token = localStorage.getItem('token');
	const handleEditTransaction = async () => {
		const data = {
			name: editName,
			amount: editAmount,
			category: editCategory,
			date: editDate,
			transactionId: defaultData.transactionId
		};
		await updateTransactionApi(token, defaultData.transactionId, data);
		dispatch(editTransaction(data));
		dispatch(closeModal());
	};
	const handleDeleteTransaction = async () => {
		await deleteTransactionApi(token, defaultData.transactionId);

		dispatch(deleteTransaction(defaultData.transactionId));
		dispatch(closeModal());
	};

	const handleClose = () => {
		dispatch(closeModal());
	};

	return (
		<div>
			<Dialog
				open={open}
				// open={true}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				PaperProps={{
					style: {
						borderRadius: '20px'
					}
				}}
			>
				<motion.div
					className="CompactCard"
					style={{
						background: '#616161'
					}}
				>
					<div className="topDiv">
						<div className="title">
							<span>Edit Transaction</span>
						</div>
						{/* <div className="topIcon">
					<Png size="2rem" />
				</div> */}
					</div>
					<div className="topInput">
						<div className="expense-name">
							<TextField
								variant="standard"
								value={editName}
								placeholder="Name"
								onChange={handleEditName}
								InputProps={{ style: { color: 'white' } }}
								InputLabelProps={{ style: { color: 'white' } }}
							></TextField>
						</div>
						<div className="amount">
							<TextField
								variant="standard"
								type="text"
								placeholder="Amount"
								value={editAmount}
								onChange={handleEditAmount}
								//onInput={handleInputChange}
								InputProps={{ style: { color: 'white' } }}
								InputLabelProps={{ style: { color: 'white' } }}
							/>
						</div>
					</div>
					<div className="bottomInput">
						<div className="date">
							<TextField
								variant="standard"
								type="date"
								inputProps={{
									max: new Date().toISOString().split('T')[0],

									min: prevSixMonthDate.toISOString().split('T')[0]
								}}
								// defaultValue={editDate}
								onInput={handleEditDate}
								InputProps={{ style: { color: 'white' } }}
								InputLabelProps={{ style: { color: 'white' } }}
							/>
						</div>
						<div className="category">
							<FormControl fullWidth>
								<InputLabel id="category">Category</InputLabel>
								<Select
									style={{
										color: 'white'
									}}
									//onChange={categoryHandler}
									required
									variant="standard"
									labelId="category"
									label="No Change"
									value={editCategory}
									onChange={handleEditCategory}
								>
									{categoriesToShow.map((category) => {
										return <MenuItem value={category}>{category}</MenuItem>;
									})}
								</Select>
							</FormControl>
						</div>
					</div>
					<div className="button-container">
						<Button
							className="add-button"
							variant="contained"
							style={{
								backgroundColor: '#5DE2B2'
							}}
							onClick={handleEditTransaction}
						>
							Confirm
						</Button>
						<Button
							onClick={handleDeleteTransaction}
							className="add-button"
							variant="contained"
							style={{
								backgroundColor: '#DF4E64'
							}}
						>
							Delete
						</Button>
					</div>
				</motion.div>
			</Dialog>
		</div>
	);
}

export default EditTransactionDialog;
