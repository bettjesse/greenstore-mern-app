import React, { useMemo, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from './Sidebar';

const ProductsList = () => {
  const dispatch = useDispatch();

  const { error, loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex justify-center items-center">
            <Link to={`/admin/product/${row.original._id}/edit`}>
              <FiEdit className="mr-2 cursor-pointer" size={18} />
            </Link>
            <FiTrash2
              className="cursor-pointer text-red-500"
              size={18}
              onClick={() => {
                // handle delete product
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const { globalFilter, setGlobalFilter, rows, prepareRow } = useTable(
    {
      columns,
      data: products,
    },
    useGlobalFilter
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Products</h1>
          <input
            className="w-64 p-1 border border-gray-400 rounded-md"
            type="text"
            placeholder="Search..."
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.Header} className="px-4 py-2 text-left">{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.original._id}>
                  {row.cells.map((cell) => (
                    <td key={cell.value} className="border px-4 py-2">{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
