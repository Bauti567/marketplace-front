import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/users/login', { email, password });
      const decoded = JSON.parse(atob(res.data.access_token.split('.')[1]));
      login(res.data.access_token, decoded.role);
      if (decoded.role === 'seller') navigate('/seller');
      else if (decoded.role === 'admin') navigate('/admin');
      else navigate('/buyer');
    } catch (err: any) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      {error && <div className="error">{error}</div>}
      <input type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}
