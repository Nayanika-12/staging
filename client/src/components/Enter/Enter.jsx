import React, { useState } from 'react';
import './Enter.css';
import { motion } from 'framer-motion';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import PropTypes from 'prop-types';

function Enter({ selectedCategory }) {
	const categories = useAppSelector(
		(state) => state.transactionState.categories
	);
	const allowedCategoriesCopy = [...categories];
	const allowedCategories = allowedCategoriesCopy.filter(
		(category) => category.type !== 'income'
	);

	const [category, setCategory] = useState();
	const categoryHandler = (event) => {
		setCategory(event.target.value);
		selectedCategory(event.target.value);
	};

	return (
		<motion.div
			className="CCard"
			style={{
				background: 'inherit'
			}}
		>
			<div className="binput">
				<div className="categ">
					<FormControl fullWidth>
						<InputLabel id="cat">CATEGORY</InputLabel>
						<Select
							onChange={categoryHandler}
							required
							variant="standard"
							labelId="cat"
							label="Cat"
							value={category}
							style={{
								border: '2px solid hsl(171, 76%, 45%)',
								borderRadius: '9px',
								width: '165px',
								height: '53px'
							}}
						>
							{allowedCategories.map((category) => {
								return (
									<MenuItem key={category.id} value={category}>
										{category.value}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
			</div>
		</motion.div>
	);
}
Enter.propTypes = {
	selectedCategory: PropTypes.func
};

export default Enter;
