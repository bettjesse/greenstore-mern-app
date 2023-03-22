// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const UserProfile = () => {
//   const {user} = useSelector((state)=> state.auth)
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleDropdownToggle = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     // Handle user logout here
//   };

//   return (
//     <>
//       {user ? (
//         <div className="relative">
//           <button
//             className="bg-transparent text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 mr-6"
//             onClick={handleDropdownToggle}
//           >
//             Welcome, {user.name}
//           </button>
//           {showDropdown && (
//             <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-md">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//               >
//                 Profile
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link to="/login">
//           <button className="bg-transparent text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 mr-6">
//             Login
//           </button>
//         </Link>
//       )}
//     </>
//   );
// };

// export default UserProfile;
