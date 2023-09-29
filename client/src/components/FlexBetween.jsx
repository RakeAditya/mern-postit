import { Box } from '@mui/material';
import { styled } from '@mui/system';
// a common flex between box to be applied inside the project
const FlexBetween = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export default FlexBetween;
