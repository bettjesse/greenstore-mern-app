import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { addToCart } from "../../actions/cartAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
  };

  const removeFromCartHandler = () => {
    // Remove product from cart
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, product.stock));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 lg:w-2/5 px-4">
          <img
            src={product.images && product.images[0] && product.images[0].url}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-3/5 px-4">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-bold mb-4">Ksh{product.price}</p>
          <div className="flex mb-4">
            <button
              onClick={decrementQuantity}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-l"
            >
              <FaMinus />
            </button>
            <p className="bg-gray-200 text-lg font-bold px-4 py-2">{quantity}</p>
            <button
              onClick={incrementQuantity}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex">
            <button
              onClick={addToCartHandler}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              disabled={product.stock===0}
            >
              Add to Cart
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
