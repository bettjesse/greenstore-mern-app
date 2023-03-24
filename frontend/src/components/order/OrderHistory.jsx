import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrder } from '../../actions/orderAction';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.myOrder);

  useEffect(() => {
    dispatch(myOrder());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders && orders.length > 0 ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Total Price</th>
           
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
      {order.items.map((item) => item.name).join(', ')}
    </td>
                <td className="border px-4 py-2">Ksh{order.totalPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">{order.paymentInfo.status}</td>
                <td className="border px-4 py-2">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};

export default OrderHistory;
