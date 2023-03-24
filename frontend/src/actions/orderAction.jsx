import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL
} from '../constants/order';

export const createOrder = (orderData) => async (dispatch) => {
  const {  isAuthenticated } = useSelector((state) => state.auth);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    console.log('Creating order with orderData:', orderData);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:4000/api/v1/order/new', orderData, config);
    console.log('Received response:', data);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message,
    });
  }
};

export const myOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const token = localStorage.getItem('token'); // retrieve the token from local storage


    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };

    const { data } = await axios.get('http://localhost:4000/api/v1/orders/me', config);

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
