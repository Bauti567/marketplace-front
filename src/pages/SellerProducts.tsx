import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis productos</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="quantity"
          type="number"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar producto
      </button>

      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td className="border p-2">{prod.name}</td>
              <td className="border p-2">{prod.sku}</td>
              <td className="border p-2">{prod.quantity}</td>
              <td className="border p-2">${prod.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
