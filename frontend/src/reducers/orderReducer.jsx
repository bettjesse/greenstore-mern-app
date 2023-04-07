import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    MY_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL ,
    ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
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
  
  


export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
       
        loading: true,
        ...state,
        error: null,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
   
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const allOrdersReducer = (state = { orders: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.data.orders,
        totalAmount:action.payload.data.totalAmount,
      }
    case ALL_ORDER_FAIL:

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case UPDATE_ORDER_RESET:
        return {
          ...state,
         
          isUpdated: false
        }
    default:
      return state;
  }
}