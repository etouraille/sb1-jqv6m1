import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdDetails from '../pages/AdDetails';
import PostAd from '../pages/PostAd';
import CategoryPage from '../pages/CategoryPage';
import Search from '../pages/Search';
import Advertising from '../pages/Advertising';
import UserDashboardLayout from '../pages/Dashboard/UserDashboard/Layout';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import UserAds from '../pages/Dashboard/UserDashboard/Ads';
import UserMessages from '../pages/Dashboard/UserDashboard/Messages';
import UserFavorites from '../pages/Dashboard/UserDashboard/Favorites';
import UserSettings from '../pages/Dashboard/UserDashboard/Settings';
import UserSubscription from '../pages/Dashboard/UserDashboard/Subscription';
import UserHistory from '../pages/Dashboard/UserDashboard/History';
import UserHelp from '../pages/Dashboard/UserDashboard/Help';
import UserNotifications from '../pages/Dashboard/UserDashboard/Notifications';
import AdminDashboardLayout from '../pages/Dashboard/AdminDashboard/Layout';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import AdminUsers from '../pages/Dashboard/AdminDashboard/Users';
import AdminModeration from '../pages/Dashboard/AdminDashboard/Moderation';
import AdminAds from '../pages/Dashboard/AdminDashboard/Ads';
import AdminMessages from '../pages/Dashboard/AdminDashboard/Messages';
import AdminNotifications from '../pages/Dashboard/AdminDashboard/Notifications';
import AdminAnalytics from '../pages/Dashboard/AdminDashboard/Analytics';
import AdminDatabase from '../pages/Dashboard/AdminDashboard/Database';
import AdminEmails from '../pages/Dashboard/AdminDashboard/Emails';
import AdminTeam from '../pages/Dashboard/AdminDashboard/Team';
import AdminSubscriptions from '../pages/Dashboard/AdminDashboard/Subscriptions';
import AdminLegal from '../pages/Dashboard/AdminDashboard/Legal';
import AdminCareers from '../pages/Dashboard/AdminDashboard/Careers';
import AdminSettings from '../pages/Dashboard/AdminDashboard/Settings';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Cookies from '../pages/Cookies';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Help from '../pages/Help';
import Security from '../pages/Security';
import Report from '../pages/Report';
import Careers from '../pages/Careers';
import ProtectedRoute from '../components/ProtectedRoute';
import RouteError from '../components/RouteError';
import DashboardError from '../components/DashboardError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'ad/:id', element: <AdDetails /> },
      { path: 'category/:categoryId', element: <CategoryPage /> },
      { path: 'search', element: <Search /> },
      { path: 'advertising', element: <Advertising /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'cookies', element: <Cookies /> },
      { path: 'contact', element: <Contact /> },
      { path: 'about', element: <About /> },
      { path: 'help', element: <Help /> },
      { path: 'security', element: <Security /> },
      { path: 'report', element: <Report /> },
      { path: 'careers', element: <Careers /> },
      {
        path: 'post-ad',
        element: (
          <ProtectedRoute>
            <PostAd />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboardLayout />
          </ProtectedRoute>
        ),
        errorElement: <DashboardError />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: 'ads', element: <UserAds /> },
          { path: 'messages', element: <UserMessages /> },
          { path: 'favorites', element: <UserFavorites /> },
          { path: 'notifications', element: <UserNotifications /> },
          { path: 'subscription', element: <UserSubscription /> },
          { path: 'history', element: <UserHistory /> },
          { path: 'settings', element: <UserSettings /> },
          { path: 'help', element: <UserHelp /> },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboardLayout />
          </ProtectedRoute>
        ),
        errorElement: <DashboardError />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'moderation', element: <AdminModeration /> },
          { path: 'ads', element: <AdminAds /> },
          { path: 'messages', element: <AdminMessages /> },
          { path: 'notifications', element: <AdminNotifications /> },
          { path: 'analytics', element: <AdminAnalytics /> },
          { path: 'database', element: <AdminDatabase /> },
          { path: 'emails', element: <AdminEmails /> },
          { path: 'team', element: <AdminTeam /> },
          { path: 'subscriptions', element: <AdminSubscriptions /> },
          { path: 'legal', element: <AdminLegal /> },
          { path: 'careers', element: <AdminCareers /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },
    ],
  },
]);