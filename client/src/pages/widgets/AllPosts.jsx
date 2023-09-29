import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from 'states';
import PostWidget from './PostWidget';
const AllPosts = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const token = useSelector((state) => state.token);
	// function to handle posts
	const getPosts = async () => {
		const resp = await fetch('http://localhost:3001/posts', {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await resp.json();
		const revData = data.slice().reverse();
		dispatch(setPosts({ posts: revData }));
	};

	// All posts of a particular user
	const getUserPosts = async () => {
		const resp = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await resp.json();
		const revData = data.slice().reverse();
		dispatch(setPosts({ posts: revData }));
	};
	React.useEffect(() => {
		//Prfile holds the value of particular use id if empty then show ll posts othewise show that user related posts
		if (!isProfile) getPosts();
		else getUserPosts();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<>
			{posts.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }) => (
				<PostWidget
					key={_id}
					postId={_id}
					postUserId={userId}
					name={`${firstName} ${lastName}`}
					description={description}
					location={location}
					picturePath={picturePath}
					userPicturePath={userPicturePath}
					likes={likes}
					comments={comments}
				/>
			))}
		</>
	);
};

export default AllPosts;
