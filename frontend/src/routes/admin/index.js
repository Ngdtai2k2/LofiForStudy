import DashBoard from '../../admin/page/DashBoard';
import UsersManger from '../../admin/page/UsersManager';
import AdminNotFound from '../../admin/page/adminNotFound';

export const adminRoutes = [
  { path: '/admin', element: <DashBoard /> },
  { path: '/admin/users', element: <UsersManger /> },
  { path: '/admin/*', element: <AdminNotFound /> },
];
