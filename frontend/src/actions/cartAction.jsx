import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO,INCREASE_QTY,DECREASE_QTY } from "../constants/cartConstant";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    console.log("Product data:", data);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        images: data.product.images[0].url,
        price: data.product.price,
        stock: data.product.stock,
        qty,
      },
    });

    console.log("Cart items:", getState().cart.cartItems);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("Error:", error);
  }
};

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const increaseQty = (item) => async (dispatch) => {
  dispatch({ type: INCREASE_QTY, payload: item });
};

export const decreaseQty = (item) => async (dispatch) => {
  dispatch({ type: DECREASE_QTY, payload: item });
};


export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
