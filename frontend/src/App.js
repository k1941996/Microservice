import appRoutes from "$routes/routes";
import "./App.css";
import { RouterProvider } from "react-router-dom";

const App = () => {
  
  return <RouterProvider router={appRoutes} />;
};

export default App;
