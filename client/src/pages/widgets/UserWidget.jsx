import React from 'react';
import { Box, useTheme, Typography, Divider } from '@mui/material';
import UserImage from 'components/UserImage';
import Wrapper from 'components/Wrapper';
import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
const UserWidget = ({ userId, picturePath }) => {
	const [user, setUser] = React.useState(null);
	const navigate = useNavigate();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	// color
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;
	// getUser function fetch user from database
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

	const { firstName, lastName, occupation, location, viewedProfile, impressions, friends } = user;
	return (
		<Wrapper>
			{/* Row -1  */}
			<FlexBetween gap="0.5rem" pd="1.2rem" onClick={() => navigate(`/profile/${userId}`)}>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath} />
					<Box>
						<Typography variant="h4" color={dark} fontWeight="500" sx={{ '&:hover': { cursor: 'pointer', color: palette.primary.light } }}>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>{friends.length} friends</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>
			<Divider />
			{/* Row 2 */}
			<Box p="1rem 0rem">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>

				<Box display="flex" alignItems="center" gap="1rem">
					<WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>
			<Divider />
			{/* Row 3 */}
			<Box p="1rem 0rem">
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Who viewed your profile</Typography>
					<Typography color={main} fontWeight="500">
						{viewedProfile}
					</Typography>
				</FlexBetween>
				<FlexBetween mb="0.5rem">
					<Typography color={medium}>Impressions</Typography>
					<Typography color={main} fontWeight="500">
						{impressions}
					</Typography>
				</FlexBetween>
			</Box>
			<Divider />
			{/* row 4th */}
			<Box p="1rem 0rem">
				<Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
					Social Profile
				</Typography>
				{/* Twitter row */}
				<FlexBetween gap="1rem" mb="0.5rem">
					<FlexBetween gap="1rem">
						<img src="../assets/twitter.png" alt="twitter" />
						<Box>
							<Typography color={main} fontWeight="500">
								Twitter
							</Typography>
							<Typography color={medium}>Social Network</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
				{/* Linkdin row */}
				<FlexBetween gap="1rem">
					<FlexBetween gap="1rem">
						<img src="../assets/linkedin.png" alt="linkdin" />
						<Box>
							<Typography color={main} fontWeight="500">
								Linkdin
							</Typography>
							<Typography color={medium}>Connections</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</Wrapper>
	);
};

export default UserWidget;
