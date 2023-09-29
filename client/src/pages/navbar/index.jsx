import React from 'react';
import { Box, IconButton, Typography, InputBase, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material';
import { Search, DarkMode, LightMode, Message, Notifications, Help, Menu, Close } from '@mui/icons-material';
// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { setMode, setLogout } from 'states';
import FlexBetween from 'components/FlexBetween';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	// States
	const [isMobileToggle, setIsMobileTogle] = React.useState(false);
	const user = useSelector((state) => state.user);
	const bigView = useMediaQuery('(min-width : 1000px)');
	// Pallete definition
	const neutralLight = theme.palette.neutral;
	const dark = theme.palette.neutral.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.alt;

	const fullName = `${user.firstName} ${user.lastName}`;
	// const fullName = 'Aditya Srivastava';
	return (
		<FlexBetween padding="1rem 6%" backgroundColor={alt}>
			<FlexBetween gap="1.75rem">
				<Typography
					fontWeight="bold"
					color="primary"
					fontSize="clamp(1rem,2rem,2.30rem)"
					onClick={() => navigate('/home')}
					sx={{ '&:hover': { color: primaryLight, cursor: 'pointer' } }}
				>
					PostIT
				</Typography>
				{bigView && (
					<FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
						<InputBase placeholder="...Search" />
						<IconButton title="search button">
							<Search />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>
			{/* Desktop view */}
			{bigView ? (
				<FlexBetween gap="2rem">
					<IconButton title="Mode button" onClick={() => dispatch(setMode())}>
						{theme.palette.mode === 'dark' ? <LightMode sx={{ color: dark, fontSize: '25px' }} /> : <DarkMode sx={{ fontSize: '25px' }} />}
					</IconButton>
					<Message sx={{ fontSize: '25px' }} />
					<Notifications sx={{ fontSize: '25px' }} />
					<Help sx={{ fontSize: '25px' }} />
					<FormControl variant="standard" value={fullName}>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: '150px',
								borderRadius: '1.25rem',
								p: '0.25rem 1rem',
								'& .MuiSvgIcon-root': {
									pr: '0.25rem',
									width: '3rem',
								},
								'& .MuiSelect-select:focus': {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton title="mobile toggle" onClick={() => setIsMobileTogle((pre) => !pre)}>
					<Menu />
				</IconButton>
			)}
			{/* Mobile view */}
			{!bigView && isMobileToggle && (
				<Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>
					{/* Close button aaea */}
					<IconButton onClick={() => setIsMobileTogle((pre) => !pre)}>
						<Close />
					</IconButton>
					{/* Menu items */}
					<FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
						<IconButton onClick={() => dispatch(setMode())}>
							{theme.palette.mode === 'dark' ? <LightMode sx={{ color: dark, fontSize: '25px' }} /> : <DarkMode sx={{ fontSize: '25px' }} />}
						</IconButton>
						<Message sx={{ fontSize: '25px' }} />
						<Notifications sx={{ fontSize: '25px' }} />
						<Help sx={{ fontSize: '25px' }} />
						<FormControl variant="standard" value={fullName}>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: '150px',
									borderRadius: '1.25rem',
									p: '0.25rem 1rem',
									'& .MuiSvgIcon-root': {
										pr: '0.25rem',
										width: '3rem',
									},
									'& .MuiSelect-select:focus': {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
};

export default Navbar;
