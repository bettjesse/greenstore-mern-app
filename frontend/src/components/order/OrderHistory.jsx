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
      <h2>Order History</h2>
      {orders && orders.length > 0 ? (
        <ul>
         {orders}
        </ul>
      ) : (
        <div>No orders found</div>
      )}
    </div>
  );
};



export default OrderHistory;
