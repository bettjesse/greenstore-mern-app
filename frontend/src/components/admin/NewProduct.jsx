


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [imagesPreview, setImagesPreview] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { error, loading, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (success) {
      dispatch({ type: NEW_PRODUCT_RESET });
      setSuccessMessage('Product created successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/products');
      }, 3000);
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', image);
    });
    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <h1 className="text-lg font-medium mb-4">New Product</h1>
        {successMessage && (
          <div className="bg-green-200 p-2 mb-2 rounded">{successMessage}</div>
        )}
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
    Price(kg)
  </label>
  <input
    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="price"
    type="number"
    value={price}
    onChange={(e) => {
      const value = e.target.value;
      if (value >= 0) {
        setPrice(value);
      } else {
        alert("Price must be greater than zero.");
        setPrice(0);
      }
    }}
    min="0"
  />
</div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2
" htmlFor="description">
Description
</label>
<textarea
className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
id="description"
rows="5"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
</div>
<div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
    Number of 
  </label>
  <input
    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="stock"
    type="number"
    value={stock}
    onChange={(e) => {
      const value = e.target.value;
      if (value >= 1) {
        setStock(value);
      } else {
        alert("Stock must be greater than zero.");
        setStock(1);
      }
    }}
    min="1"
  />
</div>


<div className="mb-4">
<label className="block text-gray-700 font-bold mb-2" htmlFor="images">
Images
</label>
<input
           className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           id="images"
           type="file"
           accept="image/*"
           multiple
           onChange={onChange}
         />
<div className="flex justify-start mt-2">
{imagesPreview.map((imagePreview, index) => (
<img key={index} src={imagePreview} alt="Preview" className="h-20 mr-2" />
))}
</div>
</div>
<button
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         type="submit"
         disabled={loading}
       >
{loading ? 'Creating Product...' : 'Create Product'}
</button>
{error && <div className="text-red-500 font-bold mt-2">{error}</div>}
</form>
</div>
</div>
);
};

export default NewProduct;