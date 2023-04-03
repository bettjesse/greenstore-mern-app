import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productsConstants';
import Sidebar from './Sidebar';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])

  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.newProduct);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', price);
    formData.append('description', description);
   images.forEach(image=> {
    formData.append("images", image)
   })
    console.log("formData: ", formData);
    console.log("images: ", images);
    console.log("images length: ", images.length);
    console.log("typeof images: ", typeof images);
    dispatch(newProduct(formData));
  };

  const onChange = e => {
    const files = Array.from(e.target.files)
    setImagesPreview([])
    setImages([])
    files.forEach(file=> {
const reader = new FileReader()
         reader.onload= ()=> {
          if (reader.readyState===2){
            setImagesPreview(oldArray=> [...oldArray, reader.result])
            setImages(oldArray=> [...oldArray, reader.result])
          }
         }
         reader.readAsDataURL(file)
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <h1 className="text-lg font-medium mb-4">New Product</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="images">
              Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="images"
              type="file"
              multiple
              onChange={onChange}
            />
          </div>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}

            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create'}
          </button>
          {error && <p className="text-red-500">{error}</p>
        }</form>
</div>
</div>
);
};

export default NewProduct;