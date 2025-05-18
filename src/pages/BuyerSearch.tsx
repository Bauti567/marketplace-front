import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


type Product = {
  _id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdBy: {
    name: string;
    email: string;
  };
};

export default function BuyerSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    sku: '',
    minPrice: '',
    maxPrice: '',
  });

  const [error, setError] = useState('');

  const { token } = useContext(AuthContext);
  const fetchProducts = async () => {
  try {
    const query = new URLSearchParams();
    if (filters.name) query.append('name', filters.name);
    if (filters.sku) query.append('sku', filters.sku);
    if (filters.minPrice) query.append('minPrice', filters.minPrice);
    if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);

    const res = await axios.get(`http://localhost:3000/products?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(res.data);
  } catch (err) {
    setError('Error al buscar productos');
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchProducts();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Buscar productos</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          name="name"
          placeholder="Nombre"
          value={filters.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          name="sku"
          placeholder="SKU"
          value={filters.sku}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          name="minPrice"
          type="number"
          placeholder="Precio mínimo"
          value={filters.minPrice}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Precio máximo"
          value={filters.maxPrice}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Buscar
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">SKU</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Vendedor</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="text-center">
                <td className="border p-2">{prod.name}</td>
                <td className="border p-2">{prod.sku}</td>
                <td className="border p-2">${prod.price.toFixed(2)}</td>
                <td className="border p-2">{prod.quantity}</td>
                <td className="border p-2">{prod.createdBy?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
