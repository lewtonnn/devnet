import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ADD_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_ACCOUNT, PROFILE_LOADING,
} from './consts';

export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/v1/profiles/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/profiles/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/profiles/github/${username}`);
    console.log(res.data);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/profiles');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
      payload: null,
    });
  }
};

export const createProfile = (
    formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/profiles', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    toast.success(edit ? 'Profile Updated' : 'Profile Created');

    if (!edit) {
      history.push('/dashboard');
    }

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/profiles/experience', formData,
        config);

    dispatch({
      type: ADD_EXPERIENCE,
      payload: res.data,
    });

    toast.success('Experience added');

    history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/profiles/education', formData,
        config);

    dispatch({
      type: ADD_EDUCATION,
      payload: res.data,
    });

    toast.success('Education added');

    history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profiles/experience/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE,
      payload: res.data,
    });
    toast.success('Experience Deleted');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.msg);
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/profiles/education/${id}`);
    dispatch({
      type: DELETE_EDUCATION,
      payload: res.data,
    });
    toast.success('Education Deleted');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.msg);
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      toast.info('Your account has been permanently deleted!');
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      toast.error(err.msg);
    }
  }
};

export const setProfileLoading = () => dispatch => {
  dispatch({
    type: PROFILE_LOADING,
  });
};