import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../constants/order';

export const createOrder = (orderData) => async (dispatch) => {
 
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = localStorage.getItem('token');
    console.log('Creating order with orderData:', orderData);
    console.log('Creating order payment with payment info:', orderData);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.post('http://localhost:4000/api/v1/order/new',orderData, config);
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
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    console.log('Getting order details...');
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = localStorage.getItem('token'); // retrieve the token from local storage

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`, config);
    console.log('Order details retrieved:', data);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.error('Failed to get order details:', error);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
