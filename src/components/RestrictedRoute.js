import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RestrictedRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Navigate to="/contacts" /> : Component;
};
