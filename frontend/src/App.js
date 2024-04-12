import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/home';
import Music from './pages/music';
import Admin from './pages/admin';
import NotFound from './pages/notFound';

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isAdmin = () => {
    return user?.isAdmin;
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={isAdmin() ? <Admin /> : <Navigate to="/404" />}
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
