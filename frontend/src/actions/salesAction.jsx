// salesActions.js

import axios from 'axios';

// Action types
import {
    GENERATE_SALES_REPORT_REQUEST,GENERATE_SALES_REPORT_SUCCESS,GENERATE_SALES_REPORT_FAILURE

} from "../constants/sales.js"

// Action creators
export const generateSalesReport = (startDate, endDate) => async (dispatch) => {
  dispatch({ type: GENERATE_SALES_REPORT_REQUEST });
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  try {
    const response = await axios.post('http://localhost:4000/api/v1/admin/reports/sales', { startDate, endDate },config);
    console.log("response.dat",response.data)
    dispatch({
      type: GENERATE_SALES_REPORT_SUCCESS,
      payload: response.data.data,
      
    });
    console.log("data.data",response.data.data)
  } catch (error) {
    dispatch({
      type: GENERATE_SALES_REPORT_FAILURE,
      payload: error.response ? error.response.data.error : 'Server error',
    });
  }
};
