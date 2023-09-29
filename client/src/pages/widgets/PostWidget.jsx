import React from 'react';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import FriendList from 'components/FriendList';
import Wrapper from 'components/Wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from 'states';
const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	// Colored imports
	const { palette } = useTheme();
	const main = palette.neutral.main;
	const primary = palette.primary.main;
	// React states and function
	const [isComment, setIsComment] = React.useState(false);
	// likes is a map of userid:boolean so we basically cheking whether the likes consist of current userId or not
	const isLiked = Boolean(likes[loggedInUserId]);
	const likeCount = Object.keys(likes).length;
	// Function to update likes on the post
	const patchLikes = async () => {
		const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});
		const updatedPost = await response.json();
		// now backend send all the updated post data and w will send it to redux state
		dispatch(setPost({ post: updatedPost }));
	};

	return (
		<Wrapper m="2rem 0">
			<FriendList friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
			<Typography color={main} sx={{ mt: '1rem' }}>
				{description}
			</Typography>
			{picturePath && (
				<img
					width="100%"
					height="auto"
					alt="post"
					src={`http://localhost:3001/assets/${picturePath}`}
					style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
				/>
			)}
			<FlexBetween gap="0.25rem">
				<FlexBetween gap="1rem">
					{/* Liked section */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={patchLikes}> {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}</IconButton>
						<Typography>{likeCount}</Typography>
					</FlexBetween>
					{/* comment section */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComment((pre) => !pre)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>
				{/* Share  */}
				<ShareOutlined />
			</FlexBetween>
			{isComment && (
				<Box mt="0.5rem">
					{comments.map(({ comment, index }) => (
						<Box key={`${name}-${index}`}>
							<Divider />
							<Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>{comment}</Typography>
						</Box>
					))}
					<Divider />
				</Box>
			)}
		</Wrapper>
	);
};

export default PostWidget;
