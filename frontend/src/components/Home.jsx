import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from './MetaData';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../actions/productActions';
import FeaturedProduct from './products/FeaturedProduct';

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products, count} = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <MetaData title={"Buy healthy food online"} />

      {/* Banner Image */}
      <div className="bg-gray-800 h-80 flex items-center justify-center">
        <img src="/images/banner2.jpg" alt="Banner" className="h-full w-full object-cover" />
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold my-8 mx-auto max-w-screen-lg px-4">Featured Products</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.slice(0, 4).map(product => (
            <FeaturedProduct key={product._id} product={product}/>
          ))
        )}
      </div>

      {/* All Products */}
      <h2 className="text-2xl font-bold my-8 mx-auto max-w-screen-lg px-4">All Products</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.slice(1,5).map(product => (
            <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Link to={`/product/${product._id}`}>
                <div className="bg-gray-200 h-64 w-full flex items-center justify-center">
                  <img src={product.images[0].url} alt={product.name} className="h-3/4 w-3/4 object-contain" />
                </div>
                <div className="px-4 py-2">
                  <h2 className="text-lg font-medium mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-2">${product.price}</p>
                  <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default Home;
