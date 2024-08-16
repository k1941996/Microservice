import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className={`shadow-lg relative z-20 dark:bg-dark-navbar`}>
      <div className="bg-gradient-to-tr from-pink-300 to-violet-600 dark:bg-gradient-to-tr dark:from-pink-900 dark:to-violet-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <div className="w-10 h-5 mr-4 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"></div>
              </Link>
            </div>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-2xl w-full">
                <label htmlFor="search" className="sr-only">
                  Search Products
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full mr-2 pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search Products"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/login" className="flex items-center">
                <button className="animated-bg ml-8 bg-gradient-to-tr from-violet-500 to-pink-500 dark:bg-gradient-to-tr dark:from-dark-navbar dark:to-gray-700 p-1 rounded text-white active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
                <label className="px-3 cursor-pointer dark:text-slate-50">Login/Signup</label>
              </Link>

              <Link to="/signup/admin" className="flex items-center">
                <button className="animated-bg ml-4 bg-gradient-to-tr from-violet-500 to-pink-500 dark:bg-gradient-to-tr dark:from-dark-navbar dark:to-gray-700 p-1 rounded text-white active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
                <label className="px-3 cursor-pointer dark:text-slate-50">
                  Sell Here!
                </label>
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
