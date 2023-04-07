import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaProductHunt, FaCog, FaChevronDown, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-1/6">
      <ul className="p-4">
        <li className="my-4">
          <Link to="/dashboard" className="flex items-center text-gray-100 hover:text-gray-300">
            <FaHome className="mr-2" />
            <h2 className="text-lg font-medium">Dashboard</h2>
          </Link>
        </li>
        <li className="my-4">
          <Link to="/users" className="flex items-center text-gray-100 hover:text-gray-300">
            <FaUser className="mr-2" />
            <h2 className="text-lg font-medium">Users</h2>
          </Link>
        </li>
        <li className="my-4">
          <div className="flex items-center justify-between text-white p-4 cursor-pointer">
            <span className="flex items-center">
              <FaProductHunt className="mr-2" />
              <h2 className="text-lg font-medium">Products</h2>
            </span>
            <FaChevronDown className="text-gray-300" />
          </div>
          <ul className="p-4">
            <li className="my-2">
              <Link to="/products" className="text-gray-100 hover:text-gray-300">
                <h4 className="text-md font-medium">All Products</h4>
              </Link>
            </li>
            <li className="my-2">
              <Link to="/add-product" className="text-gray-100 hover:text-gray-300">
                <h4 className="text-md font-medium">Add new</h4>
              </Link>
            </li>
          </ul>
        </li>
        <li className="my-4">
          <Link to="/admin/orders" className="flex items-center text-gray-100 hover:text-gray-300">
            <FaClipboardList className="mr-2" />
            <h2 className="text-lg font-medium">Orders</h2>
          </Link>
        </li>
        <li className="my-4">
          <Link to="/settings" className="flex items-center text-gray-100 hover:text-gray-300">
            <FaCog className="mr-2" /> 
            <h2 className="text-lg font-medium">Settings</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
