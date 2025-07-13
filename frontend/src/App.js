import { ToasterContextProvider } from '$components/Toaster/Toaster.jsx';
import { useAuthorizeQuery } from '$redux/Misc.js';
import appRoutes from '$routes/routes';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  useAuthorizeQuery();

  return (
    <ToasterContextProvider>
      <RouterProvider router={appRoutes} />
    </ToasterContextProvider>
  );
};

export default App;
