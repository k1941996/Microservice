import { useAuthorizeQuery } from '@api/AuthApiWithRTK';
import { RouterProvider } from 'react-router-dom';
import appRoutes from './routes/routes';
import './App.css';
const App = () => {
  useAuthorizeQuery();

  return <RouterProvider router={appRoutes} />;
};

export default App;
