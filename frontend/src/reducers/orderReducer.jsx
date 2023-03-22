import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    
    MY_ORDER_FAIL
  } from '../constants/order';
  
  
  
  export const newOrderReducer = (state ={}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload
        };
      case CREATE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  const initialMyOrdersState = {
    loading: false,
    orders: [],
    error: null
  };
  
  export const myOrdersReducer = (state = initialMyOrdersState, action) => {
    switch (action.type) {
      case MY_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case MY_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload
        };
      case MY_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  