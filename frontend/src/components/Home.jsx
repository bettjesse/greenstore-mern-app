import React from 'react';
import MetaData from './MetaData';


const Home = () => {
  return (
    <div>
        <MetaData title={"Buy healthy food online"}/>
      {/* Banner Image */}
      <div className="bg-gray-800 h-80 flex items-center justify-center">
        <img src="/images/banner.jpg" alt="Banner" className="h-full w-full object-cover" />
      </div>

      {/* Products */}
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        


 
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-200 h-64 w-full flex items-center justify-center">
        <img src="/path/to/product1.jpg" alt="Product" className="h-3/4 w-3/4 object-contain" />
      </div>
      <div className="px-4 py-2">
        <h2 className="text-lg font-medium mb-2">Product 1</h2>
        <p className="text-gray-700 mb-2">$9.99</p>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Add to Cart
        </button>
      </div>
    </div>
  


        </div>
      </div>
    
  );
};

export default Home;
