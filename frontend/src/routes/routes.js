import Signup from "$pages/Signup";
import { createBrowserRouter, Outlet } from "react-router-dom";

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
    ],
  },
]);

export default appRoutes;
