import React, { Fragment, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, setPostLoading } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {

  const dispatch = useDispatch();

  const posts = useSelector(state => state.post.posts);
  const loading = useSelector(state => state.post.loading);

  useLayoutEffect(() => {
    dispatch(setPostLoading());
    dispatch(getPosts());
  }, [dispatch]);

  return (
      loading
          ? <Spinner/>
          : <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome to the community
            </p>
            <PostForm/>
            <div className="posts">
              {posts.map(post => (
                  <PostItem key={post._id} post={post} displayControl={true}/>
              ))}
            </div>
          </Fragment>
  );
};

export default Posts;
