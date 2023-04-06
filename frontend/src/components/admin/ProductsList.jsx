// import React, { useMemo, useEffect } from 'react';
// import { useTable, useGlobalFilter } from 'react-table';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAdminProducts } from '../../actions/productActions';
// import { Link } from 'react-router-dom';
// import { FiEdit, FiTrash2 } from 'react-icons/fi';
// import Sidebar from './Sidebar';

// // AZURE_PROFILE_PHOTO_CONTAINER_NAME=student-profiles
// // AZURE_PDF_CONTAINER_NAME=
// // AZURE_BLOB_STORAGE_DUMP_URL=https://staticgghs.blob.core.windows.net/student-profiles
// // AZURE_BLOB_STORAGE_PDF_DUMP_URL=
// // AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=staticgghs;AccountKey=c1oy0Zl4MzN2LACz4k7tdYQKqfqxeXBgOpnt4I/1YvavtgpHPbHBJh+fB2dun74+LMjqRUVNj5NA+ASt9YhezQ==;EndpointSuffix=core.windows.net"
// // LOCAL_MONGO_URI=mongodb://localhost:27017/school-system
// const ProductsList = () => {
//   const dispatch = useDispatch();

//   const { error, loading, products } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(getAdminProducts());
//   }, [dispatch]);

//   const columns = useMemo(
//     () => [
//       {
//         Header: 'ID',
//         accessor: '_id',
//       },
//       {
//         Header: 'Name',
//         accessor: 'name',
//       },
//       {
//         Header: 'Price',
//         accessor: 'price',
//       },
//       {
//         Header: 'Stock',
//         accessor: 'stock',
//       },
//       {
//         Header: 'Actions',
//         Cell: ({ row }) => (
//           <div className="flex justify-center items-center">
//             <Link to={`/admin/product/${row.original._id}/edit`}>
//               <FiEdit className="mr-2 cursor-pointer" size={18} />
//             </Link>
//             <FiTrash2
//               className="cursor-pointer text-red-500"
//               size={18}
//               onClick={() => {
//                 // handle delete product
//               }}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const { globalFilter, setGlobalFilter, rows, prepareRow } = useTable(
//     {
//       columns,
//       data: products,
//     },
//     useGlobalFilter
//   );

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="w-full p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-lg font-medium">Products</h1>
//           <input
//             className="w-64 p-1 border border-gray-400 rounded-md"
//             type="text"
//             placeholder="Search..."
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//           />
//         </div>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               {columns.map((column) => (
//                 <th key={column.Header} className="px-4 py-2 text-left">{column.Header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr key={row.original._id}>
//                   {row.cells.map((cell) => (
//                     <td key={cell.value} className="border px-4 py-2">{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductsList;

import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts, deleteProduct } from '../../actions/productActions'; // import deleteProduct action
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productsConstants';

const ProductsList = () => {
  const dispatch = useDispatch();

  const { error, loading, products } = useSelector((state) => state.products);
  const { success } = useSelector((state) => state.deleteProduct);

  const [successMessage,setSuccessMessage] = useState(null)
  useEffect(() => {
    dispatch(getAdminProducts());
    if (success) {
      dispatch({ type: DELETE_PRODUCT_RESET });
      setSuccessMessage(" Product deleted successfully")
      setTimeout(()=>{
        setSuccessMessage(null)
      },3000)
    }
  }, [dispatch, success]);

  const deleteProductHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

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
            <Link to={`/product/admin/${row.original._id}/edit`}>
              <FiEdit className="mr-2 cursor-pointer" size={18} />
            </Link>
            <FiTrash2
              className="cursor-pointer text-red-500"
              size={18}
              onClick={() => deleteProductHandler(row.original._id)}
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

        {success && (
          <div className="bg-green-100 text-green-900 px-4 py-2 rounded-md mb-4">
         {successMessage}
          </div>
        )}
        <table className="table-auto w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.Header} className="px-4 py-2 text-left">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.original._id}>
                  {row.cells.map((cell) => (
                    <td key={cell.value} className="border px-4 py-2">
                      {cell.render('Cell')}
                    </td>
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

