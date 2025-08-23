import React, { useState } from 'react';
import NewProfile from '../NewProfile/NewProfile';
import Profile from '../profile/Profile';
function ProfileContainer() {
	const [viewEditProfile, setViewEditProfile] = useState(false);
	const editProfileHandler = () => {
		setViewEditProfile(!viewEditProfile);
	};
	return !viewEditProfile ? (
		<NewProfile editProfileHandler={editProfileHandler} />
	) : (
		<Profile editProfileHandler={editProfileHandler} />
	);
}

export default ProfileContainer;
