import React, { Fragment, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  getPost,
  setPostLoading,
  updateLikes,
} from '../../actions/post';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Moment from 'react-moment';

const SinglePost = ({ match }) => {

  const dispatch = useDispatch();

  const post = useSelector(state => state.post.post);
  const loading = useSelector(state => state.post.loading);

  useLayoutEffect(() => {
    dispatch(setPostLoading());
    dispatch(getPost(match.params.id));
  }, [dispatch, match.params.id]);

  return (
      loading || post === null
          ? <Spinner/>
          : <Fragment>
            <Link to="/posts" className="btn">Back to Posts</Link>
            <div className="post bg-white p-1 my-1">
              <div>
                <Link to={`/profile/${post.user}`}>
                  <img
                      className="round-img"
                      src={post.avatar}
                      alt=""
                  />
                  <h4>{post.name}</h4>
                </Link>
              </div>
              <div>
                <p className="my-1">{post.text}</p>
                <p className="post-date">
                  Posted on <Moment format="YYYY/MM/DD HH:mm">{post.date}</Moment>
                </p>
                <button type="button" className="btn btn-light"
                        onClick={() => dispatch(updateLikes(post._id))}>
                  <i className="fas fa-thumbs-up"/>{' '}
                  {post.likes.length > 0 && (
                      <span>{post.likes.length}</span>
                  )}
                </button>
              </div>
            </div>
            <CommentForm postId={post._id}/>
            <div className="comments">
              {post.comments.map(comment => (
                  <CommentItem key={comment._id} comment={comment}
                               postId={post._id}/>
              ))}
            </div>
          </Fragment>
  );
};

export default SinglePost;
