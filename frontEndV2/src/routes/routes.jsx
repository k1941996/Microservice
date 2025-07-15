import { createBrowserRouter } from 'react-router-dom';
import Login from '@pages/Login';
import Home from '@pages/Home';
import Cart from '@pages/Cart';
import Signup from '@pages/Signup';
import Forgotpassword from '@pages/Forgotpassword';
import ResetPassword from '@pages/Resetpassword';
import Wrapper from './Wrapper';
import AdminWrapper from './AuthWrapper';
import ProductList from '@pages/AdminPages/ProductList';



const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: '/signup/admin',
        element: <Signup type={`admin`} />,
      },
      {
        path: '/signup/customer',
        element: <Signup type={`customer`} />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: 'Forgotpassword',
        element: <Forgotpassword />,
      },
      {
        path: '/reset/:accountId/:token',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminWrapper />,
    children: [
      {
        path: 'products',
        element: <ProductList />,
      },
    ],
  },
]);

export default appRoutes;
