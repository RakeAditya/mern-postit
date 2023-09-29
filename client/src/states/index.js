import { createSlice } from '@reduxjs/toolkit';

// At first we define the initial state that will be used as global state
const initialState = {
	mode: 'light',
	user: null,
	token: null,
	posts: [],
};
// authSLice is created with name , its initial values and reducer function to be called to change the state value
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else console.log('User friends does not exist');
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const newPost = state.posts.map((post) => {
				if (post._id === action.payload.post._id) return action.payload.post;
				return post;
			});
			state.posts = newPost;
		},
	},
});

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } = authSlice.actions;
export default authSlice.reducer;
