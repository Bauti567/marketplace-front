import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../index.css'

type Product = {
  _id?: string;
  name: string;
  sku: string;
  quantity: string;
  price: string;
};

export default function SellerProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: '',
    sku: '',
    quantity: '',
    price: '',
  });
  const [error, setError] = useState('');

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/products/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      setError('Error al cargar tus productos');
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.sku || !form.quantity || !form.price) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/products',
        {
          ...form,
          quantity: Number(form.quantity),
          price: Number(form.price),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ name: '', sku: '', quantity: '', price: '' });
      setError('');
      fetchMyProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear producto');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Gestión de productos</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <div className="bg-gray-50 border rounded-lg p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-blue-400"
          />
          <input
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-blue-400"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Cantidad"
            value={form.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-blue-400"
          />
          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-blue-400"
          />
        </div>

        <button
          onClick={handleCreate}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
        >
          Agregar producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <div
            key={prod._id}
            className="bg-white border border-gray-200 rounded-lg shadow p-4 transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800">{prod.name}</h3>
            <p className="text-sm text-gray-500">SKU: {prod.sku}</p>
            <p className="text-sm text-gray-500">Cantidad: {prod.quantity}</p>
            <p className="text-sm text-gray-500">Precio: ${prod.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
