import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login,loadUser } from '../../actions/userAction';
import MetaData from '../MetaData';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [message,setMessage]= useState("")
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize the navigate hook

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {


    if (isAuthenticated) {
      console.log('Redirecting to homepage...');
      navigate('/') // navigate to home page
    }
  }, [isAuthenticated,dispatch,error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    if (!email) {
    setEmailError('Please enter your email');
    } else if (!/\S+@\S+.\S+/.test(email)) {
    setEmailError('Please enter a valid email');
    } else if (!password) {
    setPasswordError('Please enter your password');
    } else {
    console.log('Logging in with email:', email, 'password:', password);
    dispatch(login(email, password));
   
  
    }
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <MetaData title={'Login'} />
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <div className="bg-red-500 p-3 text-white mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error.includes('password') && (
              <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4">
            <span className="mr-2">Don't have an account?</span>
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;