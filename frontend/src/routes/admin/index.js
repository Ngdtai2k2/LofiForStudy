import DashBoard from '../../admin/page/DashBoard';
import UsersManger from '../../admin/page/UsersManager';
import AdminNotFound from '../../admin/page/AdminNotFound';
import SongManager from '../../admin/page/SongManager';
import BackgroundsManager from '../../admin/page/BackgroundsManager';

export const adminRoutes = [
  { path: '/admin', element: <DashBoard /> },
  { path: '/admin/users', element: <UsersManger /> },
  { path: '/admin/songs', element: <SongManager /> },
  { path: '/admin/backgrounds', element: <BackgroundsManager /> },
  { path: '/admin/*', element: <AdminNotFound /> },
];
