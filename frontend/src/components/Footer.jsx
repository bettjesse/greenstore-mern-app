import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 flex flex-col">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold mb-4">About Us</h4>
          <p className="text-gray-500">Our mission is to change the way you shop. By connecting you with the source of your food, we hope that you will see the value in understanding about the process, passion and purpose that all our producers carry throughout the creation of our products.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Links</h4>
          <ul className="list-none">
            <li className="mb-2"><Link className="text-gray-500 hover:text-white" to="/">Home</Link></li>
            <li className="mb-2"><Link className="text-gray-500 hover:text-white" to="/about">About Us</Link></li>
            <li className="mb-2"><Link className="text-gray-500 hover:text-white" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p className="text-gray-500 mb-2">Bruce house</p>
          <p className="text-gray-500 mb-2">Nairobi,</p>
          <p className="text-gray-500 mb-2">Phone: (123) 456-7890</p>
          <p className="text-gray-500 mb-2">Email: info@greenstore.com</p>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; 2023 Greenstore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
