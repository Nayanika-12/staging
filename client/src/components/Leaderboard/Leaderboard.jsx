import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAppSelector } from '../../app/hooks';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14,
		backgroundColor: '#5B238A',
		color: 'white'
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		},
		'&:last-child td, &:last-child th': {
			border: 0
		}
	}
}))(TableRow);

function createData(name, pic, calories, fat, carbs, protein) {
	return { name, pic, calories, fat, carbs, protein };
}

export default function Leaderboard() {
	const userInfo = useAppSelector((state) => state.transactionState.userInfo);
	const rows = [
		createData(
			'Frozen yoghurt',
			'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Prescription02&hatColor=PastelGreen&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=BlazerSweater&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Yellow',
			159,
			200,
			24,
			1
		),
		createData(
			'Ice cream sandwich',
			'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBigHair&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=Overall&clotheColor=White&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=Pale',
			237,
			150,
			37,
			2
		),
		createData(
			'Eclair',
			'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Prescription02&hairColor=Red&facialHairType=BeardMedium&facialHairColor=Red&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Hearts&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Tanned',
			262,
			130,
			24,
			3
		),
		createData(
			'Cupcake',
			'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Blue&facialHairType=Blank&facialHairColor=Auburn&clotheType=ShirtScoopNeck&clotheColor=PastelGreen&eyeType=Squint&eyebrowType=UpDown&mouthType=Tongue&skinColor=Brown',
			305,
			130,
			67,
			4
		),
		createData(
			'Gingerbread',
			'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Red&eyeType=Hearts&eyebrowType=Default&mouthType=Twinkle&skinColor=Tanned',
			356,
			120,
			49,
			5
		),
		createData(
			`${userInfo.firstname} ${userInfo.lastname}`,
			userInfo.profilePicture,
			356,
			120,
			49,
			454
		)
	];
	return (
		<TableContainer component={Paper}>
			<Table style={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>User</StyledTableCell>
						<StyledTableCell align="right">Total XP</StyledTableCell>
						<StyledTableCell align="right">Coins</StyledTableCell>
						<StyledTableCell align="right">Budget Score</StyledTableCell>
						<StyledTableCell align="right">#Global Rank</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.name}>
							<StyledTableCell component="th" scope="row">
								{
									<img
										style={{
											height: '2.8rem',
											width: '2.8rem',
											borderRadius: '50%'
										}}
										alt=""
										src={row.pic}
									></img>
								}{' '}
								{row.name}
							</StyledTableCell>
							<StyledTableCell align="right">{row.calories}</StyledTableCell>
							<StyledTableCell align="right">{row.fat}</StyledTableCell>
							<StyledTableCell align="right">{row.carbs}</StyledTableCell>
							<StyledTableCell align="right">{row.protein}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
