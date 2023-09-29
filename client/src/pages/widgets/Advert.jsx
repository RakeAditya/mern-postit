import React from 'react';
import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Wrapper from 'components/Wrapper';

const Advert = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;
	return (
		<Wrapper>
			<FlexBetween>
				<Typography color={dark} variant="h5" fontWeight="500">
					Sponsered
				</Typography>
				<Typography color={medium}>Created ad</Typography>
			</FlexBetween>
			<img
				width="100%"
				height="auto"
				alt="advertisement"
				src="http://localhost:3001/assets/info4.jpeg"
				style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
			/>
			<FlexBetween>
				<Typography color={main}>Ideal Cosmetics</Typography>
				<Typography color={medium}>Ideal@gmail.com</Typography>
			</FlexBetween>
			<Typography color={medium} m="0.5rem 0 ">
				{' '}
				Your pathway to an ideal looking skin
			</Typography>
		</Wrapper>
	);
};

export default Advert;
