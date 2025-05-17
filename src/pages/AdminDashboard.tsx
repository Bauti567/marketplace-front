import { useEffect, useState } from 'react';
import axios from '../api/axios';

type Product = {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    sku: '',
    minPrice: '',
    maxPrice: '',
    sellerId: '',
  });

  const [error, setError] = useState('');

  const fetchAllProducts = async () => {
    try {
      const query = new URLSearchParams();

      if (filters.name) query.append('name', filters.name);
      if (filters.sku) query.append('sku', filters.sku);
      if (filters.minPrice) query.append('minPrice', filters.minPrice);
      if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
      if (filters.sellerId) query.append('sellerId', filters.sellerId);

      const res = await axios.get(`/products/all?${query.toString()}`);
      setProducts(res.data);
    } catch (err) {
      setError('Error al cargar productos');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchAllProducts();
  };

  return (
    <div>
      <h2>Panel de administrador</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input name="name" placeholder="Nombre" value={filters.name} onChange={handleChange} />
        <input name="sku" placeholder="SKU" value={filters.sku} onChange={handleChange} />
        <input name="minPrice" type="number" placeholder="Precio mínimo" value={filters.minPrice} onChange={handleChange} />
        <input name="maxPrice" type="number" placeholder="Precio máximo" value={filters.maxPrice} onChange={handleChange} />
        <input name="sellerId" placeholder="ID de vendedor" value={filters.sellerId} onChange={handleChange} />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>SKU</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Vendedor</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.sku}</td>
              <td>${prod.price.toFixed(2)}</td>
              <td>{prod.quantity}</td>
              <td>{prod.createdBy?.name}</td>
              <td>{prod.createdBy?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
