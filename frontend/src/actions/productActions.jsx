import {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  
  ALL_PRODUCTS_FAIL, 
  ALL_PRODUCTS_SUCCESS,
   ALL_PRODUCTS_REQUEST, 
   ALL_ADMIN_PRODUCTS_FAIL,
   ALL_ADMIN_PRODUCTS_SUCCESS,
   ALL_ADMIN_PRODUCTS_REQUEST,
PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, CLEAR_ERROR } from "../constants/productsConstants";
    import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });

    const {data} =  await axios.get("http://localhost:4000/api/v1/products");
    // const data = await response.json();

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload:data
      
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const {data} = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    // const data = await response.json();

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ADMIN_PRODUCTS_REQUEST,
    });
    const token = localStorage.getItem('token');
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `${token}`,
    //   },
    // };


    const {data} = await axios.get(`http://localhost:4000/api/v1/admin/products`);
    // const data = await response.json();

    dispatch({
      type: ALL_ADMIN_PRODUCTS_SUCCESS,
      payload: data.products
    });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });
    const token = localStorage.getItem('token');
   

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/admin/product/new",
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



export const clearError = async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
