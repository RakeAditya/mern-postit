import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Redux setup
import auhReducer from './states';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Redux persist import -- to kepp the user information on user window or browser
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, auhReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: { ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
