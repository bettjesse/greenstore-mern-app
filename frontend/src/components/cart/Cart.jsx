import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { removeFromCart, increaseQty,decreaseQty } from "../../actions/cartAction"
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../actions/cartAction';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
 
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/shipping');
    } else {
      navigate('/login');
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDecreaseQty = (item) => {
    dispatch(decreaseQty(item));
  };
  
  const handleIncreaseQty = (item) => {
    dispatch(increaseQty(item));
  };
  

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length < 1 ? (
       <h2 className="text-lg">
       Cart is empty{" "}
       <Link to="/">
         <span className="text-xl font-bold hover:underline hover:text-blue-500">
           Go shopping!
         </span>{" "}
       </Link>
     </h2>
     
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <>
                <li key={item.product} className="py-4 flex">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img src={item.images} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.product}`} className="font-medium">{item.name}</Link>
                      <div className="mt-2 flex items-center">
                        <span className="text-gray-500">Ksh{item.price} x </span>
                        <button className="text-gray-500 px-2 py-1 rounded-full mr-2" onClick={() => handleDecreaseQty(item)} >
                          <FaMinus />
                        </button>
                        <span className="text-lg">{item.qty}</span>
                        <button className="text-gray-500 px-2 py-1 rounded-full ml-2" onClick={() => handleIncreaseQty(item)} >
                          <FaPlus />
                        </button>
                        <span className="text-gray-500 ml-4">Ksh{item.qty * item.price}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <button className="text-gray-500" onClick={() => handleRemoveFromCart(item.product)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
                <hr className="my-4" />
              </>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <div>
              <p className="text-right font-medium">Subtotal:</p>
              <p className="text-right">Ksh{subtotal.toFixed(2)}</p>
            </div>
            <button  onClick ={handleCheckout}className="ml-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
