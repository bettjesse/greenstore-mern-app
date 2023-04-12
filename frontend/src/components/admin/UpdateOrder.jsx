import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { updateOrder, getOrderDetails } from '../../actions/orderAction';
import Sidebar from './Sidebar';
import { UPDATE_ORDER_RESET } from '../../constants/order';

const UpdateOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, product } = useSelector(
    (state) => state.getOrderDetails
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.updateOrder);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrder(id, { status }));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate(`/order/${id}`);
    }
  }, [successUpdate, dispatch, id, navigate]);

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="container mx-auto py-8">
        <Link to={`/order/${id}`} className="text-gray-600 hover:text-gray-800">
          &larr; Back to Order Details
        </Link>
        <h1 className="text-2xl font-bold my-4">Update Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="status" className="font-bold mb-2">
              Status
            </label>
            <select
              className="border border-gray-500 rounded-lg py-2 px-3"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Select Status --</option>
             <option value="confirmed">confirmed</option>
              <option value="Pending">Pending</option>
         
              
              <option value="shipped">shipped</option>
              <option value="delivered">delivered</option>

            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
        {loadingUpdate && <p>Updating order...</p>}
        {errorUpdate && <p className="text-red-500">{errorUpdate}</p>}
      </div>
    </div>
  );
};

export default UpdateOrder;
