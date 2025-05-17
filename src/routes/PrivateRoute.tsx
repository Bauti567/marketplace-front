import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { token, role } = useContext(AuthContext);
  if (!token || !allowedRoles.includes(role)) return <Navigate to="/login" />;
  return children;
};
