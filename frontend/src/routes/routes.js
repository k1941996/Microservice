import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import NavBar from '$components/NavBar';
import Login from '$pages/Login';
import Home from '$pages/Home';
import Cart from '$pages/Cart';
import Signup from '$pages/Signup';
import Forgotpassword from '$pages/Forgotpassword';
import ResetPassword from '$pages/Resetpassword';
import Footer from '$components/Footer.jsx';

const Wrapper = () => {
  const location = useLocation();
  const isFooterVisible =
    location.pathname === '/login' || location.pathname === '/signup/customer' || location.pathname === '/signup/admin';
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="flex flex-1 basis-full ">
        <Outlet />
      </div>
      {isFooterVisible ? null : <Footer />}
    </div>
  );
};

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
]);

export default appRoutes;
