import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import Home from './pages/home';
import Music from './pages/music';
import NotFound from './pages/notFound';
import AdminNotFound from './admin/page/adminNotFound';
import DashBoard from './admin/page/DashBoard';

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;

  const decodedToken =
    typeof accessToken === 'string' ? jwtDecode(accessToken) : null;

  const isAdmin = () => {
    if (!user || !decodedToken) return false;
    return decodedToken?.isAdmin || false;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={isAdmin() ? <DashBoard /> : <Navigate to="/404" />}
        />
        <Route
          path="/admin/*"
          element={isAdmin() ? <AdminNotFound /> : <Navigate to="/404" />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
