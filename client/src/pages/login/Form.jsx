import React from 'react';
// Styles and Icons
import { Box, Button, useTheme, useMediaQuery, TextField, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// Otherimports
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'states';
import Dropzone from 'react-dropzone';
// Creating a register schema with the help of yup
const registerSchema = yup.object().shape({
	firstName: yup.string().required('required'),
	lastName: yup.string().required('required'),
	email: yup.string().email('invalid email').required('required'),
	password: yup.string().required('required'),
	location: yup.string().required('required'),
	occupation: yup.string().required('required'),
	picture: yup.string().required('required'),
});
// Creating a login schema
const loginSchema = yup.object().shape({
	email: yup.string().email('imvalid email').required('required'),
	password: yup.string().required('required'),
});
// Creating a base or initial values for form
const initRegister = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	location: '',
	occupation: '',
	picture: '',
};
const initialLogin = {
	email: '',
	password: '',
};
const Form = () => {
	// states
	const dispath = useDispatch();
	const navigate = useNavigate();
	const { palette } = useTheme();
	const isPcView = useMediaQuery('(min-width : 600px )');
	const [pageType, setPageType] = React.useState('register');
	const isLogin = pageType === 'login';
	const isRegister = pageType === 'register';
	// Submit function
	const register = async (values, onSubmtProps) => {
		const formData = new FormData();
		for (let itr in values) {
			formData.append(itr, values[itr]);
		}
		formData.append('picturePath', values.picture.name);
		// formData.forEach((e) => console.log(e));
		const resp = await fetch('http://localhost:3001/auth/register', {
			method: 'POST',
			body: formData,
		});
		const savedResp = await resp.json();
		// console.log(savedResp);
		onSubmtProps.resetForm();
		if (savedResp) setPageType('login');
	};
	const login = async (values, onSubmtProps) => {
		const LoggedInResp = await fetch('http://localhost:3001/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		});
		const resp = await LoggedInResp.json();
		// console.log(resp);
		onSubmtProps.resetForm();
		if (resp) {
			dispath(
				setLogin({
					user: resp.user,
					token: resp.token,
				})
			);
		}
		navigate('/home');
	};
	const handleSubmitForm = async (values, onSubmtProps) => {
		if (isLogin) await login(values, onSubmtProps);
		if (isRegister) await register(values, onSubmtProps);
	};
	return (
		<Formik
			onSubmit={handleSubmitForm}
			initialValues={isLogin ? initialLogin : initRegister}
			validationSchema={isLogin ? loginSchema : registerSchema}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue }) => (
				<form onSubmit={handleSubmit}>
					<Box
						display="grid"
						gap="30px"
						gridTemplateColumns="repeat(4,minmax(0,1fr))"
						sx={{
							'& > div': { gridColumn: isPcView ? undefined : 'span 4' },
						}}
					>
						{isRegister && (
							<>
								<TextField
									name="firstName"
									label="First Name"
									value={values.firstName}
									onBlur={handleBlur}
									onChange={handleChange}
									error={Boolean(touched.firstName) && Boolean(errors.firstName)}
									helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									name="lastName"
									label="Last Name"
									value={values.lastName}
									onBlur={handleBlur}
									onChange={handleChange}
									error={Boolean(touched.lastName) && Boolean(errors.lastName)}
									helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: 'span 2' }}
								/>

								<TextField
									name="location"
									label="Location"
									value={values.location}
									onBlur={handleBlur}
									onChange={handleChange}
									error={Boolean(touched.location) && Boolean(errors.location)}
									helperText={touched.location && errors.location}
									sx={{ gridColumn: 'span 4' }}
								/>
								<TextField
									name="occupation"
									label="Occupation"
									value={values.occupation}
									onBlur={handleBlur}
									onChange={handleChange}
									error={Boolean(touched.occupation) && Boolean(errors.occupation)}
									helperText={touched.occupation && errors.occupation}
									sx={{ gridColumn: 'span 4' }}
								/>
								<Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
									<Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed ${palette.primary.main}`}
												p="1rem"
												sx={{ '&:hover': { cursor: 'pointer' } }}
												overflow="hidden"
											>
												<input {...getInputProps()} />
												{!values.picture ? (
													<p>Add picture here</p>
												) : (
													<FlexBetween>
														<Typography> {values.picture.name}</Typography>
														<EditOutlinedIcon />
													</FlexBetween>
												)}
											</Box>
										)}
									</Dropzone>
								</Box>
							</>
						)}
						<TextField
							name="email"
							label="Email id"
							value={values.email}
							onBlur={handleBlur}
							onChange={handleChange}
							error={Boolean(touched.email) && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							sx={{ gridColumn: 'span 4' }}
						/>
						<TextField
							name="password"
							label="Password"
							type="password"
							value={values.password}
							onBlur={handleBlur}
							onChange={handleChange}
							error={Boolean(touched.password) && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							sx={{ gridColumn: 'span 4' }}
						/>
					</Box>
					{/* Buttons */}
					<Box>
						<Button
							title="Login/Register button"
							fullWidth
							type="submit"
							sx={{
								m: '2rem 0',
								p: '1rem',
								backgroundColor: palette.primary.main,
								color: palette.background.alt,
								'&:hover': { color: palette.primary.main },
							}}
						>
							{isLogin ? 'Login' : 'Register'}
						</Button>
						<Typography
							onClick={() => {
								setPageType(isLogin ? 'register' : 'login');
							}}
							sx={{ textDecoration: 'underline', color: palette.primary.main, '&:hover': { color: palette.primary.light, cursor: 'pointer' } }}
						>
							{isLogin ? 'Dont Have an Account Sign up here' : 'Already have an account sign in here'}
						</Typography>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default Form;
