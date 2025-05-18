import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import SellerProducts from './pages/SellerProducts';
import BuyerSearch from './pages/BuyerSearch'; // 👈 este
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/PrivateRoute';
import HomePage from './pages/HomePage';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/seller"
          element={
            <ProtectedRoute role="seller">
              <SellerProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer"
          element={
            <ProtectedRoute role="buyer">
              <BuyerSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
