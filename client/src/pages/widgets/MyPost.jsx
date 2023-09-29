import React from 'react';
import { EditOutlined, DeleteOutline, AttachFileOutlined, GifBoxOutlined, MicOutlined, ImageOutlined, MoreHorizOutlined } from '@mui/icons-material';
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import Wrapper from 'components/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'states';
const MyPost = ({ picturePath }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const isNonMobileView = useMediaQuery('(min-width : 1000px)');
	// MUI Color
	const mediumMain = palette.neutral.mediumMain;
	const medium = palette.neutral.medium;
	// Redux states
	const token = useSelector((state) => state.token);
	const { _id } = useSelector((state) => state.user);
	const [isImage, setIsImage] = React.useState(false);
	const [image, setImage] = React.useState(null);
	const [post, setPost] = React.useState('');
	// Handle post function
	const handlePost = async () => {
		const formData = new FormData();
		formData.append('userId', _id);
		formData.append('description', post);
		if (image) {
			console.log('another way', image.name);
			formData.append('picture', image);
			formData.append('picturePath', image.name);
		}
		const resp = await fetch(`http://localhost:3001/posts`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		});
		const posts = await resp.json();
		dispatch(setPosts({ posts }));
		setImage(null);
		setPost('');
	};
	return (
		<Wrapper>
			<FlexBetween gap="1.5em">
				<UserImage image={picturePath} />
				<InputBase
					value={post}
					onChange={(e) => setPost(e.target.value)}
					placeholder="What's on your mind..."
					sx={{ width: '100%', borderRadius: '2rem', backgroundColor: palette.neutral.light, padding: '1rem 2rem' }}
				/>
			</FlexBetween>
			{isImage && (
				<Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
					<Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed ${palette.primary.main}`}
									p="1rem"
									width="100%"
									sx={{ '&:hover': { cursor: 'pointer' } }}
									overflow="hidden"
								>
									<input {...getInputProps()} />
									{!image ? (
										<p>Add Image here</p>
									) : (
										<FlexBetween>
											<Typography> {image.name}</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{image && (
									<IconButton title="submit button" sx={{ width: '15%' }} onClick={() => setImage(null)}>
										<DeleteOutline />
									</IconButton>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}
			<Divider sx={{ margin: '1.25rem 0' }} />
			<FlexBetween>
				<FlexBetween gap="0.25rem" onClick={() => setIsImage((pre) => !pre)}>
					<ImageOutlined sx={{ color: mediumMain }} />
					<Typography color={mediumMain} sx={{ '&:hover': { cursor: 'pointer', color: medium } }}>
						Image
					</Typography>
				</FlexBetween>
				{/* Other sections will be displayed in desktop view only */}
				{isNonMobileView ? (
					<>
						<FlexBetween gap="0.25rem">
							<MicOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Audio</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem">
							<GifBoxOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Clip</Typography>
						</FlexBetween>

						<FlexBetween gap="0.25rem">
							<AttachFileOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Attachment</Typography>
						</FlexBetween>
					</>
				) : (
					<>
						<FlexBetween gap="0.25rem">
							<Typography color={mediumMain}>More</Typography>
							<MoreHorizOutlined sx={{ color: mediumMain }} />
						</FlexBetween>
					</>
				)}
				<Button
					disabled={!post}
					onClick={handlePost}
					sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: '3rem' }}
				>
					POST
				</Button>
			</FlexBetween>
		</Wrapper>
	);
};

export default MyPost;
