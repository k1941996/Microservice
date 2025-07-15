import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';

const Wrapper = () => {
  const isFooterVisible =
    location.pathname === '/login' || location.pathname === '/signup/customer' || location.pathname === '/signup/admin';
  return (
    <div className="flex h-full flex-col">
      <NavBar />
      <div className="flex flex-1 basis-full">
        <Outlet />
      </div>
      {isFooterVisible ? null : <Footer />}
    </div>
  );
};

export default Wrapper;
