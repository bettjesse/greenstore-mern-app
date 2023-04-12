import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateSalesReport } from "../../actions/salesAction";
import Sidebar from './Sidebar';

const Report = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const salesReport = useSelector(state => state.salesReport); // Assuming you have a salesReport reducer

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateSalesReport(startDate, endDate));
  }

  const handlePrint = () => {
    window.print();
  }

  return (
    
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Generate Sales Report</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Start Date:</label>
            <input type="date" className="border border-gray-300 px-2 py-1 mb-2 w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label className="block mb-2">End Date:</label>
            <input type="date" className="border border-gray-300 px-2 py-1 mb-2 w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Generate Report</button>
          </form>
          {/* Render sales report data */}
          {salesReport.loading && <p className="mt-4">Loading...</p>}
          {salesReport.error && <p className="mt-4 text-red-500">{salesReport.error}</p>}
          {salesReport && (
            <div className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Sales Summary</h3>
                <p><strong>Start Date:</strong> {salesReport.startDate}</p>
                <p><strong>End Date:</strong> {salesReport.endDate}</p>
                <p><strong>Total Sales:</strong> Ksh{salesReport.totalSales}</p>
                <p><strong>Total Orders:</strong> {salesReport.totalOrders}</p>
                <p><strong>Average Order Value:</strong> Ksh{salesReport.averageOrderValue}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Top Selling Products</h3>
                {/* Table to display top selling products */}
                <table className="border-collapse border border-gray-400 w-full mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-4 py-2">Product Name</th>
                      <th className="border border-gray-400 px-4 py-2">Quantity Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesReport.topSellingProducts.map(product => (
                      <tr key={product.name} className="text-center">
                        <td className="border border-gray-400 px-4 py-2">{product.name}</td>
                        <td
className="border border-gray-400 px-4 py-2">{product.quantity}</td>
</tr>
))}
</tbody>
</table>
</div>
<div>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handlePrint}>Print Report</button>
</div>
</div>
)}
</div>
</div>

);
}

export default Report;





