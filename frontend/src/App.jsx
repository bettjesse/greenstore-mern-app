import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetails from './components/products/ProductDetails';
import Login from './components/user/Login';
import { useDispatch } from 'react-redux';
import Register from './components/user/Register';
import { loadUser } from './actions/userAction';
import store from './store';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderHistory from './components/order/OrderHistory';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/route/ProtectedRoute';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';


const stripePromise = loadStripe("pk_test_51MlndeEGaG54q0rrSzY649HcJaHATq8YxddP8JQr6olYi0mVczg6610N8o6BA2qig541aM7B8fZqsCWNxQbGY5Kh00M3o7P0N4");

const App = () => {


  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  const [stripeApiKey, setStripeApiKey] = useState('');


  useEffect(() => {

  const fetchStripeApiKey = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/stripeapikey");

      if (!response.ok) {
        throw new Error("Failed to fetch Stripe API key.");
      }

      const data = await response.json();
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error(error);
    }
  };

  fetchStripeApiKey();
}, []);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
        <Route path ="/orders" element= {<OrderHistory/>}/>
        <Route path ="/order/:id" element= {<OrderDetails/>}/>
        <Route path ="/dashboard" element= {<Dashboard/>}/>
        <Route path ="/products" element= {<ProductsList/>}/>
        <Route path ="/add-product" element= {<NewProduct/>}/>
   
  {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAdmin={true} />} />
  */}
 
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
