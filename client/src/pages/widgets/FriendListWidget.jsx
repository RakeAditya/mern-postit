import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Wrapper from 'components/Wrapper';
import FriendList from 'components/FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'states';
const FriendListWidget = ({ userid }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);
	const { palette } = useTheme();
	const getFriends = async () => {
		const response = await fetch(`http://localhost:3001/users/${userid}/friends`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
	};

	React.useEffect(() => {
		getFriends();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Wrapper>
			<Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: '1.5rem ' }}>
				Friend List
			</Typography>
			<Box display="flex" flexDirection="column" gap="1.5rem">
				{friends.map((friend) => (
					<FriendList
						key={friend._id}
						friendId={friend._id}
						name={`${friend.firstName} ${friend.lastName}`}
						subtitle={friend.occupation}
						userPicturePath={friend.picturePath}
					/>
				))}
			</Box>
		</Wrapper>
	);
};

export default FriendListWidget;
