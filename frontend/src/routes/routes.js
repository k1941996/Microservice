import Signup from "$pages/Signup";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "$pages/Login";
import Home from "$pages/Home";
import Cart from "$pages/Cart";
import { element } from "prop-types";
import Newlogin from "$pages/Newlogin";
import Forgotpassword from "$pages/Forgotpassword";
import NavBar from "$components/NavBar";
import ResetPassword from "$pages/Resetpassword";

const Wrapper = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-violet-100 to-pink-100 dark:bg-gradient-to-tr dark:from-gray-500 dark:to-zinc-500">
      <NavBar />

      <Outlet />
    </div>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/signup/admin",
        element: <Signup type={`admin`} />,
      },
      {
        path: "/signup/customer",
        element: <Signup type={`customer`} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/reset/:accountId/:token",
        element: <ResetPassword />,
      },
      {
        path: "Forgotpassword",
        element: <Forgotpassword />,
      },
    ],
  },
]);

export default appRoutes;
