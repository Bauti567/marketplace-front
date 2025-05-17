import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';
import SellerProducts from './pages/SellerProducts';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/navbar';
import { PrivateRoute } from './routes/PrivateRoute';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/seller"
            element={
              <PrivateRoute allowedRoles={['seller']}>
                <SellerProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
