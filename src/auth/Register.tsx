import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'

export default function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'seller',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:3000/users/register', form);
            const decoded = JSON.parse(atob(res.data.access_token.split('.')[1]));
            login(res.data.access_token, decoded.role);
            if (decoded.role === 'seller') navigate('/seller');
            else if (decoded.role === 'admin') navigate('/admin');
            else navigate('/buyer');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al registrar');
        }
    };

    return (
        <div className="container">
            <h2>Registro</h2>
            {error && <div className="error">{error}</div>}
            <input name="name" placeholder="Nombre completo" onChange={handleChange} />
            <input name="email" placeholder="Correo electrónico" onChange={handleChange} />
            <input name="phone" placeholder="Teléfono" onChange={handleChange} />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
            <button onClick={handleRegister}>Registrarse</button>
        </div>
    );
}
