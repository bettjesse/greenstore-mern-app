

import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct,getProductDetails } from '../../actions/productActions';
import {  UPDATE_PRODUCT_RESET } from '../../constants/productsConstants';
import Sidebar from './Sidebar';

const UpdateProduct = () => {
  const {id} = useParams();

  UPDATE_PRODUCT_RESET
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages,setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(
    (state) => state.updateProduct
  );

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/products');
      }, 3000);
    } else {
      if (!product || product._id !== id) {
        dispatch(getProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setStock(product.stock);
        setOldImages(product.images)
      }
    }
  }, [dispatch, navigate, id, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    images.forEach((image) => {
      formData.append('images', images);
    });
    dispatch(updateProduct(id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([])
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <h1 className="text-lg font-medium mb-4">Update Product</h1>
        {successMessage && (
          <div className="bg-green-200 p-2 mb-2 rounded">{successMessage}</div>
        )}
        {loadingUpdate && <p>Loading...</p>}
        {errorUpdate && <p>{errorUpdate}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter product name"
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
placeholder="Enter product price"
value={price}
onChange={(e) => setPrice(e.target.value)}
/>
</div>
<div className="mb-4">
<label className="block text-gray-700 font-bold mb-2" htmlFor="description">
Description
</label>
<textarea
className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
id="description"
placeholder="Enter product description"
value={description}
onChange={(e) => setDescription(e.target.value)}
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
placeholder="Enter product stock"
value={stock}
onChange={(e) => setStock(e.target.value)}
/>
</div>
{/* <div className="mb-4">
<label className="block text-gray-700 font-bold mb-2" htmlFor="images">
Images
</label>
<input
             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="images"
             type="file"
             multiple
             accept="image/*"
             onChange={onChange}
           />
</div>
{oldImages && oldImages.map((img)=>(
    <img key ={img} src= {img.url} alt="Product preview" className="h-20 mr-2 mb-2" />
))}
<div className="mb-4">
{imagesPreview.map((preview) => (
<img src={preview} alt="Product preview" className="h-20 mr-2 mb-2" />
))}
</div> */}
<div className="flex items-center justify-between">
<button
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             type="submit"
           >
Update
</button>
<button
className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
onClick={() => navigate('/products')}
>
Cancel
</button>
</div>
</form>
)}
</div>
</div>
);
};

export default UpdateProduct;


