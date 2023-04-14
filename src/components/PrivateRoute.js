import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isCheckingLogin = useSelector((state) => state.auth.isCheckingLogin);
  const shouldRedirect = !isLoggedIn && !isCheckingLogin;

  return shouldRedirect ? <Navigate to="/login" /> : Component;
};
