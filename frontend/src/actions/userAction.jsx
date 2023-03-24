import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  LOAD_USERREQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
    LOGOUT_FAIL,
  
  CLEAR_ERROR,
} from "../constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:4000/api/v1/login',
      { email, password },
      config
    );

    const token = data.token;

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem('token', token); // save token to local storage
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USERREQUEST });

    const token = localStorage.getItem('token'); // retrieve the token from local storage

    const config = {
      headers: {
        Authorization: ` ${token}`, // include the token in the header
      },
    };

    const { data } = await axios.get(
      'http://localhost:4000/api/v1/me',
      config
    );

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};

 








// register user action


export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    
    const { data } = await axios.post('http://localhost:4000/api/v1/register', { name, email, password }, config);

    if (data.success) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      // redirect the user to the login page
      
    } else {
      dispatch({ type: USER_REGISTER_FAILURE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAILURE, payload: error.message });
  }
};

















export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_SUCCESS });
}



