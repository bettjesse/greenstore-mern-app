import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { createOrder } from '../../actions/orderAction';
// import {addToCart} from "../../actions/cartAction"

const ConfirmOrder = () => {
  const { cartItems, shipping } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  
 
// Calculate cart subtotal
const subtotal = cartItems.reduce((acc, item) => {
 
  return acc + item.qty * item.price;
}, 0);

// Calculate shipping cost
const shippingCost = subtotal > 100 ? 0 : 10;


// Calculate total cost
const totalPrice = subtotal + shippingCost;



const placeOder = ()=> {
  const orderData = {
  
  shipping,
    subtotal,
    shippingCost,
    totalPrice,
    items: cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.qty,
      product:item.product
    })),
  };
  sessionStorage.setItem('orderData', JSON.stringify(orderData));
  navigate("/payment")
  // dispatch(createOrder(orderData))
}

  return (
    <div className="max-w-lg mx-auto my-8 px-4">
      <CheckoutSteps shipping confirmOrder />
      <h2 className="text-2xl font-medium mb-4">Confirm Order</h2>

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-medium mb-4">Shipping Information</h3>
        <p className="mb-2">{user && user.name}</p>
        <p className="mb-2">{shipping.phoneNo}</p>
        <p className="mb-2">{user.email}</p>
        <p className="mb-2">{shipping.city}, {shipping.postalCode}</p>
        <p className="mb-2">{shipping.country}</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-medium mb-4">Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.product} className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={item.images} alt={item.name} className="w-12 h-12 object-contain mr-4" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.qty} x Ksh{item.price}</p>
              </div>
            </div>
            <p className="font-medium">Ksh{item.qty * item.price}</p>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between items-center mb-2">
          <span>Subtotal:</span>
          <span>Ksh{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Shipping:</span>
          <span>Ksh{shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Total:</span>
          <span>Ksh{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <Link to="/shipping" className="text-white bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200">Back To Shipping</Link>
        <button onClick= {placeOder} className="text-white bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200">Place Order</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
