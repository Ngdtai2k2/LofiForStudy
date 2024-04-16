import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { adminRoutes } from './routes/admin';
import { publicRoutes } from './routes/public';
import { decryptToken } from './utils/encodeToken';

function App() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const decodedTokenByCrypto = decryptToken(user?.accessToken);
  const decodedToken = accessToken ? jwtDecode(decodedTokenByCrypto) : null;
  const isAdmin = decodedToken ? decodedToken.isAdmin || false : false;

  return (
    <Router>
      <Routes>
        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={isAdmin ? element : <Navigate to="/404" />}
          />
        ))}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
