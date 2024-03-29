import {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,


  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  ALL_ADMIN_PRODUCTS_FAIL,
  ALL_ADMIN_PRODUCTS_SUCCESS,
  ALL_ADMIN_PRODUCTS_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../constants/productsConstants";
import axios from "axios";
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });

    const response = await axios.get("http://localhost:4000/api/v1/products");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const data = await response.json();

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: response.products,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const response = await axios.get(
      `http://localhost:4000/api/v1/products/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const data = await response.json();

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        message:false,

      }
    default:
      return state;
  }
};
 

export const productsReducers = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ALL_ADMIN_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        count: action.payload.count,
        error: null,
      };

      case ALL_ADMIN_PRODUCTS_SUCCESS:
        return{
          loading: false,
          products:action.payload
        }
    case ALL_PRODUCTS_FAIL:
      case ALL_ADMIN_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = {product:{}}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
       
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
        error: null,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
      case NEW_PRODUCT_RESET:
        return {
          ...state,
          success:false
        }
    default:
      return state;
  }
}
export const productDetailsReducer = (
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isUpdated: action.payload,
        error: null,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        success: false,
        isUpdated: false,
      };
    default:
      return state;
  }
};