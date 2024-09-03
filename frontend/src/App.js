import appRoutes from "$routes/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return <RouterProvider router={appRoutes} />;
};

export default App;
