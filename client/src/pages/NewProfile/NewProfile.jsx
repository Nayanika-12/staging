import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './NewProfile.css';
import ProgressBar from '@ramonak/react-progress-bar';
import first from '../../imgs/achievement-cards/1.png';
import second from '../../imgs/achievement-cards/2.png';
import third from '../../imgs/achievement-cards/3.png';
import fourth from '../../imgs/achievement-cards/4.jpeg';
import fifth from '../../imgs/achievement-cards/5.png';
import sixth from '../../imgs/achievement-cards/6.png';
import seventh from '../../imgs/achievement-cards/7.png';
import eighth from '../../imgs/achievement-cards/8.png';
import ninth from '../../imgs/achievement-cards/9.png';
import podium from '../../imgs/podium.png';
import b1 from '../../imgs/badges/1.jpg';
import b2 from '../../imgs/badges/2.jpg';
import b3 from '../../imgs/badges/3.jpg';
import b4 from '../../imgs/badges/4.jpg';
import b4_2 from '../../imgs/badges/4.png';
import b5 from '../../imgs/badges/5.jpg';
import b6 from '../../imgs/badges/6.jpg';

import coin from '../../imgs/coin.png';
import { Avatar, Badge, Button } from '@material-ui/core';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

function NewProfile({ editProfileHandler }) {
	const userInfo = useAppSelector((state) => state.transactionState.userInfo);

	return (
		<div className="main-container">
			<div className="profile-topDiv">
				<div className="profile-pic-container">
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						badgeContent={<Avatar style={{ width: '3rem', height: '3rem' }} src={b4_2} />}
					>
						<Avatar style={{ width: '10rem', height: '10rem' }} src={userInfo.profilePicture} />
					</Badge>
				</div>
				<div className="profile-info-container">
					<h1 className="profile-info-name">{`${userInfo.firstname} ${userInfo.lastname}`}</h1>
					<h2 className="profile-info-level">LEVEL 4</h2>
					<div className="coin-container">
						<img className="coinImg" src={coin} alt="coinImg"></img>
						<h2 className="coinNumber" style={{ fontWeight: '900' }}>
							200
						</h2>
					</div>
				</div>
				<div className="rank-container">
					{/* <img style={{ width: '12rem' }} alt="currentBadge" src={badge}></img>
					<p>POINTS: 2984</p> */}
					<Button
						style={{
							backgroundColor: '#EF5F38',
							color: 'white',
							height: '3rem'
						}}
						variant="contained"
						onClick={editProfileHandler}
					>
						Edit Profile
					</Button>
				</div>
			</div>
			<div className="progress-container">
				<p className="progress-text">Missions: 75% Completed</p>
				<ProgressBar
					height="2.3rem"
					completed={75}
					bgColor={'linear-gradient(to left, #f12711, #f5af19)'}
				/>
			</div>

			<div className="profile-midDiv">
				<div className="badges">
					<p
						style={{
							fontSize: '1.5rem',
							fontWeight: '900',
							color: 'white',
							margin: '1rem'
						}}
					>
						<p style={{}}>Badges Earned:</p>
					</p>
					<div className="badges-container">
						<img className="userBadge" alt="badge" src={b1} />
						<img className="userBadge" alt="badge" src={b2} />
						<img className="userBadge" alt="badge" src={b3} />
						<img className="userBadge" alt="badge" src={b4} />
						<img className="userBadge grey" alt="badge" src={b5} />
						<img className="userBadge grey" alt="badge" src={b6} />
					</div>
				</div>
				{/* <div className="divider">
					<Divider />
				</div> */}
				<div className="achievement-cards">
					<p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>
						Cards Collected:
					</p>
					<div className="achievement-card-container">
						<img className="achievement-card" alt="card" src={podium} />
						<img className="achievement-card" alt="card" src={first} />
						<img className="achievement-card" alt="card" src={second} />
						<img className="achievement-card" alt="card" src={third} />
						<img className="achievement-card grey" alt="card" src={fourth} />
						<img className="achievement-card grey" alt="card" src={fifth} />
						<img className="achievement-card" alt="card" src={sixth} />
						<img className="achievement-card" alt="card" src={seventh} />
						<img className="achievement-card grey" alt="card" src={eighth} />
						<img className="achievement-card" alt="card" src={ninth} />
					</div>
				</div>
			</div>
			<div className="profile-bottomDiv">
				<p
					style={{
						fontSize: '1.5rem',
						fontWeight: '900',
						color: 'white',
						marginLeft: '2rem'
					}}
				>
					Leaderboard:
				</p>
				<div className="leaderboard-container">
					<Leaderboard />
				</div>
			</div>
		</div>
	);
}

export default NewProfile;
