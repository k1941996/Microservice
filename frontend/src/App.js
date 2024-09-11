import { ToasterContextProvider } from "$components/Toaster/Toaster.jsx";
import appRoutes from "$routes/routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <ToasterContextProvider>
      <RouterProvider router={appRoutes} />
    </ToasterContextProvider>
  );
};

export default App;
