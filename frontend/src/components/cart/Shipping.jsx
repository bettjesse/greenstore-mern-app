import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import CheckoutSteps from './CheckoutSteps';

countries.registerLocale(en);



const Shipping = () => {
  const { shipping } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

 
  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [postalCode, setPostalCode] = useState(shipping.postalCode);
  const [phoneNo, setPhoneNo] = useState(shipping.phoneNo);
  const [country, setCountry] = useState(shipping.country);

  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country }));
      navigate("/confirm")
  };

  const countryOptions = Object.entries(countries.getNames('en', { select: 'official' })).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };

  return (
<>
    
    <div className="container mx-auto p-4  items-center">
    <CheckoutSteps shipping/>
      <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
      <form onSubmit={handleSubmitHandler}>
      {/* <label htmlFor="name" className="block font-bold mb-2">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /> */}

        <label htmlFor="address" className="block font-bold mb-2">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
       
        <label htmlFor="city" className="block font-bold mb-2">City:</label>
        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />

        <label htmlFor="postalCode" className="block font-bold mb-2">Postal Code:</label>
        <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />

        <label htmlFor="phoneNo" className="block font-bold mb-2">Phone Number:</label>
        <input type="text" id="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />

        <label htmlFor="country" className="block font-bold mb-2">Country:</label>
        <Select className="w-full p-2 border border-gray-300 rounded mb-4" options={countryOptions} value={{ value: country, label: countries.getName(country, 'en') }} onChange={handleCountryChange} />

        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="submit">Save Shipping Information</button>
      </form>
    </div>
    </>
  );
};

export default Shipping;
