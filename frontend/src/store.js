import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducers, productDetailsReducer } from "./reducers/productsReducer"
import { authReducer } from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer,myOrdersReducer, orderDetailsReducer } from './reducers/orderReducer';



const rootReducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducer,
  auth: authReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrdersReducer,
  getOrderDetails: orderDetailsReducer,
  

 
});



let initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};


const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
