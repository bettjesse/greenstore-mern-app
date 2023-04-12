import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { allOrders } from '../../actions/orderAction';
import Sidebar from './Sidebar';

const AllOrdersList = () => {
  const dispatch = useDispatch();
  const { loading, orders,totalAmount } = useSelector((state) => state.allOrdersRed);


  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold mb-4">All Orders</h1>
        <div className="mb-4">
          <p className="font-bold">Total Sales Amount:</p>
          <p>{totalAmount && totalAmount.toFixed(2)} ksh</p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">ID</th>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">Date</th>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">Total(ksh)</th>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">PaymentInfo</th>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">Product name</th>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">Delivery status</th>
                <th className="py-2 px-3 bg-gray-200 font-bold text-sm text-gray-700 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
  <tr key={order._id}>
    <td className="py-2 px-3 border-b border-gray-300">{order._id}</td>
    <td className="py-2 px-3 border-b border-gray-300">{order.createdAt.substring(0, 10)}</td>
    <td className="py-2 px-3 border-b border-gray-300">{order.totalPrice.toFixed(2)}</td>
    <td className="py-2 px-3 border-b border-gray-300">{order.paymentInfo.status}</td>
    {/* <td className="py-2 px-3 border-b border-gray-300">{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td> */}
    
    <td className="py-2 px-3 border-b border-gray-300">
      {/* Map the items array and display the item names */}
      {order.items.map(item => (
        <div key={item._id}>{item.name}</div>
      ))}
    </td>
    <td className="py-2 px-3 border-b border-gray-300">{order.orderStatus}</td>
    <td className="py-2 px-3 border-b border-gray-300">
      <Link to={`/admin/order/${order._id}`} className="text-blue-500 hover:text-blue-700">
        Details
      </Link>
    </td>
  </tr>
))}

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllOrdersList;