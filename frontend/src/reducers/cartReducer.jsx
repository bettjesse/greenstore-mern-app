import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, INCREASE_QTY, DECREASE_QTY } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [],shipping:{} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log("ADD_TO_CART action dispatched");
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existingItem.product ? item : cartItem
          ),
        };
      } else {
        const updatedCartItems = [...state.cartItems, item];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }
    case REMOVE_FROM_CART:
      console.log("REMOVE_FROM_CART action dispatched");
      const productId = action.payload;

      const updatedCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case INCREASE_QTY:
      console.log("INCREASE_QTY action dispatched");
      const increasedItem = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.product === increasedItem.product
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        ),
      };
    case DECREASE_QTY:
      console.log("DECREASE_QTY action dispatched");
      const decreasedItem = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.product === decreasedItem.product
            ? {
                ...cartItem,
                qty: cartItem.qty > 1 ? cartItem.qty - 1 : cartItem.qty,
              }
            : cartItem
        ),
      };
    case SAVE_SHIPPING_INFO:
      console.log("SAVE_SHIPPING_INFO action dispatched");
      return {
        ...state,
        shipping: action.payload,
      };
    default:
      return state;
  }
};
