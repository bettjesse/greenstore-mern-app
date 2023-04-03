import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaProductHunt, FaCog, FaChevronDown } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-1/6">
      <ul className="p-4">
        <li>
          <Link  to="/dashboard">
            <FaHome /> 
            <h2 className="text-gray-100">Dashboard</h2>
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FaUser /> 
            <h2 className='text-gray-100'>Users</h2>
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-between text-white p-4">
            <span>
              <FaProductHunt /> 
                <h2 className=' text-gray-100'>Products</h2>
            </span>
            <FaChevronDown />
          </div>
          <ul className="p-4">
            <li>
              <Link to="/products">
                  <h4 className='text-gray-100'> All Products </h4>
                </Link>
            </li>
            <li>
              <Link to="/add-product">
              <h4 className='text-gray-100'> Add new </h4>
                </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
