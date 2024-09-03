import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "$components/NavBar";
import Login from "$pages/Login";
import Home from "$pages/Home";
import Cart from "$pages/Cart";
import Signup from "$pages/Signup";
import Forgotpassword from "$pages/Forgotpassword";

const Wrapper = () => {
  return (
    <div>
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
    ],
  },
]);

export default appRoutes;
