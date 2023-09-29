import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'pages/navbar';
import FriendListWidget from 'pages/widgets/FriendListWidget';
import MyPost from 'pages/widgets/MyPost';
import AllPosts from 'pages/widgets/AllPosts';
import UserWidget from 'pages/widgets/UserWidget';
import React from 'react';

const Profile = () => {
	const [user, setUser] = React.useState(null);
	const { userId } = useParams();
	const token = useSelector((state) => state.token);
	const isNonMobileView = useMediaQuery('(min-width: 1000px)');
	const getUser = async () => {
		const resp = await fetch(`http://localhost:3001/users/${userId}`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await resp.json();
		setUser(data);
	};
	React.useEffect(() => {
		getUser();
	}, []); //eslint-disable-line react-hooks/exhaustive-deps
	if (!user) return null;
	return (
		<Box>
			<Navbar />
			{/* User Widget */}
			<Box width="100%" padding="2rem 6%" display={isNonMobileView ? 'flex' : 'block'} gap="2rem" justifyContent="center">
				<Box flexBasis={isNonMobileView ? '26%' : undefined}>
					<UserWidget userId={userId} picturePath={user.picturePath} />
					<Box m="2rm 0" />
					<FriendListWidget userid={userId} />
				</Box>
				{/* Post Widget */}
				<Box flexBasis={isNonMobileView ? '42%' : undefined} mt={isNonMobileView ? undefined : '2rem'}>
					<MyPost picturePath={user.picturePath} />
					<AllPosts userId={userId} isProfile />
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;
