import Signup from "$pages/Signup";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "$pages/Login";
import Home from "$pages/Home";
import Cart from "$pages/Cart";
import { element } from "prop-types";
import Newlogin from "$pages/Newlogin";
import Forgotpassword from "$pages/Forgotpassword";
import NavBar from "$components/NavBar";


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
      // {
      //   path:"Newlogin",
      //   element:<Newlogin/>
      // },
      {
        path: "Forgotpassword",
        element: <Forgotpassword />,
      },
    ],
  },
]);

export default appRoutes;
