import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
      <div className="flex justify-between items-center mb-8">
        <Link to="/shipping" className={`flex items-center ${shipping ? 'text-green-500' : 'text-gray-500'}`}>
          <span className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
          <span className="ml-2 font-medium">Shipping</span>
        </Link>
        <Link to="/confirmation" className={`flex items-center ${confirmOrder? 'text-green-500' : 'text-gray-500'}`}>
          <span className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
          <span className="ml-2 font-medium">Confirmation</span>
        </Link>
        <Link to="/payment" className={`flex items-center ${payment ? 'text-green-500' : 'text-gray-500'}`}>
          <span className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
          <span className="ml-2 font-medium">Payment</span>
        </Link>
      </div>
    );
  };
  
export default CheckoutSteps;
