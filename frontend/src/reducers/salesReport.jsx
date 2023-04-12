import {
    GENERATE_SALES_REPORT_REQUEST,
    GENERATE_SALES_REPORT_SUCCESS,
    GENERATE_SALES_REPORT_FAILURE,
  } from '../constants/sales.js';
  
  // Initial state
  const initialState = {
    startDate: null,
    endDate: null,
    totalSales: null,
    totalOrders: null,
    averageOrderValue: null,
    topSellingProducts: [],
    loading: false,
    error: null,
  };
  
  // Reducer
  export const salesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GENERATE_SALES_REPORT_REQUEST:
        return { ...state, loading: true, error: null };
      case GENERATE_SALES_REPORT_SUCCESS:
        return {
          ...state,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          totalSales: action.payload.totalSales,
          totalOrders: action.payload.totalOrders,
          averageOrderValue: action.payload.averageOrderValue,
          topSellingProducts: action.payload.topSellingProducts,
          loading: false,
          error: null,
        };
      case GENERATE_SALES_REPORT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };