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
  // LOGOUT_SUCCESS,
  //   LOGOUT_FAIL,
  
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

    const { data } = await axios.post('http://localhost:4000/api/v1/login', { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const clearError = async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
  

 








// register user action
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const response = await fetch('http://localhost:4000/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            // automatically log in the user
        } else {
            dispatch({ type: USER_REGISTER_FAILURE, payload: data.message });
        }
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILURE, payload: error.message });
    }
};





export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USERREQUEST });

    const { data } = await axios.get('http://localhost:4000/api/v1/me',{ withCredentials: true});

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};





// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOAD_USERREQUEST });

//     const { data } = await axios.get('http://localhost:4000/api/v1/me');

//     dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
//   } catch (error) {
//     dispatch({ type: LOAD_USER_FAIL, payload: error.message });
//   }
// };


// export const logout = () => async (dispatch) => {
//   try {
  

//     await axios.get('http://localhost:4000/api/v1/logout');

//     dispatch({ type: LOGOUT_SUCCESS });
//   } catch (error) {
//     dispatch({ type: LOGOUT_FAIL, payload: error.message });
//   }
// };

