import Signup from "$pages/Signup";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "$pages/Login";
import Home from "$pages/Home";
import Cart from "$pages/Cart"
import { element } from "prop-types";
import Newlogin from "$pages/Newlogin"


const Wrapper = () => {
  return (
    <div>
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
        element: <Login/>,
      },
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path:"Newlogin",
        element:<Newlogin/>
      }
    ],
  },
]);

export default appRoutes;
