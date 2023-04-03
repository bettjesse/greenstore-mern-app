import { Route, useNavigate, Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, isAdmin, ...rest }) => {
  const navigate = useNavigate()
  // const {user} = useSelector((state)=> state.auth)
  const { loading, error,user, isAuthenticated } = useSelector((state) => state.auth);
  // replace with your authentication logic
   // replace with your role logic
  
  return (
    <Routes>
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return navigate("/login");
        } else if (isAdmin && user.role !== 'admin') {
          return navigate("/"); // render a forbidden page
        } else {
          return <Component {...props} />;
        }
      }}
    />
    </Routes>
  );
};
export default ProtectedRoute
// Usage:

