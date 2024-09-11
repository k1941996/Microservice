import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "$components/NavBar";
import Login from "$pages/Login";
import Home from "$pages/Home";
import Cart from "$pages/Cart";
import Signup from "$pages/Signup";
import Forgotpassword from "$pages/Forgotpassword";
import ResetPassword from "$pages/Resetpassword";

const Wrapper = () => {
  return (
    <div className="flex flex-col min-h-screen ">
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
        path: "Forgotpassword",
        element: <Forgotpassword />,
      },
      {
        path: "/reset/:accountId/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default appRoutes;
