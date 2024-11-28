import { ToasterContextProvider } from '$components/Toaster/Toaster.jsx';
import store from '$redux/store/store.js';
import appRoutes from '$routes/routes';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <ToasterContextProvider>
        <RouterProvider router={appRoutes} />
      </ToasterContextProvider>
    </Provider>
  );
};

export default App;
