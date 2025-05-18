import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) {
  const { token, role: userRole } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
