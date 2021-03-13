import axios from 'axios';
import { toast } from 'react-toastify';
import setAuthHeader from '../helpers/setAuthHeader';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE, AUTH_LOADING,
} from './consts';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthHeader(localStorage.token);
  }
  try {
    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const body = JSON.stringify({ name, email, password });

    const res = await axios.post('/api/v1/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const body = JSON.stringify({ email, password });

    const res = await axios.post('/api/v1/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: AUTH_LOADING,
  });
};
