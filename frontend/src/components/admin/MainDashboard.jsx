// MainDashboard.js

import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productActions';

const MainDashboard = () => {
    const dispatch = useDispatch()
    const {products} = useSelector((state)=> state.products)

    useEffect(()=>{
        dispatch(getAdminProducts)
    },[dispatch])
  return (
    <div className="bg-gray-100 h-screen w-5/6">
      <h1 className="p-4">Welcome to your Dashboard!</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-medium mb-2">Orders</h2>
          <p className="text-3xl font-bold">15</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-medium mb-2">Total Amount</h2>
          <p className="text-3xl font-bold">$500</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-medium mb-2">Out of stock</h2>
          <p className="text-3xl font-bold">500</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-medium mb-2">Products</h2>
          <p className="text-3xl font-bold">{products && products.length}</p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
