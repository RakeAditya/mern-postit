import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'pages/navbar';
import Advert from 'pages/widgets/Advert';
import AllPosts from 'pages/widgets/AllPosts';
import FriendListWidget from 'pages/widgets/FriendListWidget';
import MyPost from 'pages/widgets/MyPost';
import UserWidget from 'pages/widgets/UserWidget';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
	const isNonMobileView = useMediaQuery('(min-width : 1000px)');
	const { _id, picturePath } = useSelector((state) => state.user);
	return (
		<Box>
			<Navbar />
			{/* User Widget */}
			<Box width="100%" padding="2rem 6%" display={isNonMobileView ? 'flex' : 'block'} gap="0.5rem" justifyContent="space-between">
				<Box flexBasis={isNonMobileView ? '26%' : undefined}>
					<UserWidget userId={_id} picturePath={picturePath} />
				</Box>
				{/* Post Widget */}
				<Box flexBasis={isNonMobileView ? '42%' : undefined} mt={isNonMobileView ? undefined : '2rem'}>
					<MyPost picturePath={picturePath} />
					<AllPosts userId={_id} />
				</Box>
				{/* Last widget only pops on desktop view */}
				{isNonMobileView && (
					<Box flexBasis="26%">
						<Advert />
						<Box m="2rem 0" />
						<FriendListWidget userid={_id} />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Home;
