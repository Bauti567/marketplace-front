import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Registro</Link>
        </>
      )}

      {token && role === 'buyer' && (
        <Link to="/buyer" style={{ marginRight: '10px' }}>Buscar productos</Link>
      )}

      {token && role === 'seller' && (
        <Link to="/seller" style={{ marginRight: '10px' }}>Mis productos</Link>
      )}

      {token && role === 'admin' && (
        <Link to="/admin" style={{ marginRight: '10px' }}>Admin Panel</Link>
      )}

      {token && (
        <button onClick={handleLogout}>Cerrar sesión</button>
      )}
    </nav>
  );
}
