import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST, GET_POST,
  ADD_COMMENT, REMOVE_COMMENT, POST_LOADING,
} from './consts';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateLikes = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/posts/${postId}/like`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    toast.success('Post Removed');

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/v1/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    toast.success('Post Added');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postId, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/v1/posts/${postId}/comment`, { text },
        config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    toast.success('Comment Added');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {

  try {
    const res = await axios.delete(`/api/v1/posts/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: res.data,
    });
    toast.success('Comment Removed');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setPostLoading = () => dispatch => {
  dispatch({
    type: POST_LOADING,
  });
};
