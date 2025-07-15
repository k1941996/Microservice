import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '@redux/Slice/UserSlice';
import { setAccountId, setToken } from '@utils/tokenUtil';

const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.userDetails);

  const handleLogout = () => {
    setToken('');
    setAccountId('');
    dispatch(logOut());
  };
  const [searchText, setSearchText] = useState('');
  return (
    <div className="navbar bg-base-100 min-h-fit flex-wrap gap-2 shadow-md">
      <div className="min-[665px]:hidden">
        <div className="drawer min-[721px]:hidden">
          <input
            id="navbar-drawer"
            type="checkbox"
            className="drawer-toggle"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="drawer-content px-3">
            <label htmlFor="navbar-drawer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="navbar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <span className="btn btn-ghost">
          <Link to={'/'} className="text-xl text-nowrap">
            E Commerce
          </Link>
        </span>
      </div>

      <div className="min-w-[400px] flex-1 shrink-0 max-[665px]:order-3">
        <label className="input input-bordered flex h-9 w-full items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex flex-1 justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item shadow-sm">0</span>
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Tailwind CSS Navbar component"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                {role === 'admin' && (
                  <li>
                    <Link to="/admin" className="justify-between">
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to={'/login'}>
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
