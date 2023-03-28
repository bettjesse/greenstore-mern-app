import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions/orderAction';
import { useParams } from 'react-router-dom';
import { myOrder } from '../../actions/orderAction';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {loading, error, order} = useSelector((state) => state.getOrderDetails);
 
  useEffect(() => {
    console.log("Order ID: ", id);
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      <p>Items Price: {order.itemsPrice}</p>
      <p>Shipping Price: {order.shippingPrice}</p>
      <p>Total Price: {order.totalPrice}</p>
      <p>Order Status: {order.orderStatus}</p>
      <p>Paid At: {order.paidAt}</p>
      <h2>Shipping Address</h2>
      <p>City: {order.shipping.city}</p>
      <p>State: {order.shipping.state}</p>
      <p>Country: {order.shipping.country}</p>
      <p>Postal Code: {order.shipping.postalCode}</p>
      <h2>Payment Information</h2>
      <p>Payment ID: {order.paymentInfo.id}</p>
      <p>Payment Status: {order.paymentInfo.status}</p>
      <h2>Order Items</h2>
      {order.items.map((item) => (
        <div key={item._id}>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
