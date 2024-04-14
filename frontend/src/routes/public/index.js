import Home from '../../pages/home';
import Music from '../../pages/music';
import NotFound from '../../pages/notFound';

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/music', element: <Music /> },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <NotFound /> },
];
