import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// pages
import Home from 'pages/homepage';
import Login from 'pages/login';
import Profile from 'pages/profile';
// Style Imports
import { useSelector } from 'react-redux';
// useSelecor will grab value from the store
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
const App = () => {
	const mode = useSelector((state) => state.mode);
	// console.log(mode);
	const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);
	// theme value will be changed  only when mode in the redux changes thus we have memoized the result and created a theme using mui setting in theme.js and passing all thoose defined values inside theme and after that we will create a themeprovider to apply theme styling inside all its children
	const isAuth = Boolean(useSelector((state) => state.token));
	return (
		<div className="app">
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
						<Route path="/profile/:userId" element={isAuth ? <Profile /> : <Navigate to="/" />} />
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
