import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';
const Login = () => {
	const theme = useTheme();
	const bigView = useMediaQuery('(max-width: 1000px)');
	return (
		<Box>
			{/* Header */}
			<Box width="100%" padding="1rem 6%" textAlign="center" backgroundColor={theme.palette.background.alt}>
				<Typography fontWeight="bold" color="primary" fontSize="32px">
					PostIT
				</Typography>
			</Box>
			{/* Form box */}
			<Box width={bigView ? '50%' : '94%'} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
				<Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
					Welcome to PostIT, an articulate platformn for everyone
				</Typography>
				<Form />
			</Box>
		</Box>
	);
};

export default Login;
