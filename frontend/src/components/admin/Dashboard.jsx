// Dashboard.js

import React from 'react';
import Sidebar from './Sidebar';
import MainDashboard from "./MainDashboard"

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainDashboard />
    </div>
  );
};

export default Dashboard;
