import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedProduct = ({product}) => {
  return (
    <>
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
     <div className=" h-64 w-full flex items-center justify-center">
  <Link to = {`/product/${product._id}`}>
    <img src={product.images[0].url} alt={product.name} className="object-contain max-h-full max-w-full" />
  </Link>
</div>
      <div className="px-4 py-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-medium mb-2">{product.name}</h2>
        </Link>
        <p className="text-gray-700 mb-2">Ksh{product.price}</p>
        <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
          Add to Cart
        </button>
      </div>

    </div>
   
    </>
  )
}

export default FeaturedProduct
