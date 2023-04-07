import React, { useMemo, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useSelector,useDispatch } from 'react-redux';
import { myOrder } from '../../actions/orderAction';
import { Link } from 'react-router-dom';

const OrderHistory = () => {

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.myOrder);

  useEffect(() => {
    dispatch(myOrder());
  }, [dispatch]);
  const columns = useMemo(
    () => [
      // {
      //   Header: 'Order ID',
      //   accessor: '_id',
      // },
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: 'Product Name',
        accessor: 'items',
        Cell: ({ value }) => value.map((item) => item.name).join(', '),
      },
      {
        Header: 'Total Price',
        accessor: 'totalPrice',
        Cell: ({ value }) => `Ksh${value.toFixed(2)}`,
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentInfo.status',
        Cell: ({ value }) => (
          <span style={{ color: value === 'succeeded' ? 'green' : 'red' }}>{value}</span>
        ),
      },
      // {
      //   Header: 'Delivery Status',
      //   accessor: 'orderStatus',
      //   Cell: ({ value }) => (
      //     <span style={{ color: value === 'delivered' ? 'green' : 'red' }}>{value}</span>
      //   ),
      // },
      {
        Header: 'Delivery Status',
        accessor: 'orderStatus',
        Cell: ({ value }) => {
          let color = '';
          switch(value) {
            case 'delivered':
              color = 'green';
              break;
            case 'shipped':
              color = 'blue';
              break;
            case 'processing':
              color = 'orange';
              break;
            default:
              color = 'red';
              break;
          }
          return <span style={{ color }}>{value}</span>;
        },
      },
      
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ row }) => (
          <Link to={`/order/${row.original._id}`}>
            <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded">
              View Details
            </button>
          </Link>
        ),
      },
    ],
    []
  );

  const tableData = useMemo(() => orders, [orders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } =
    useTable({ columns, data: tableData }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search orders..."
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />
      <table {...getTableProps()} className="table-auto border-collapse border border-gray-500">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border border-gray-500 p-2 font-bold">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-500">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border border-gray-500 p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
