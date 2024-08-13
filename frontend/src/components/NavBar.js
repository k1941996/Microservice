  import React from "react";
  import { Link } from "react-router-dom";

  const NavBar = () => {
    return (
      <nav className="shadow-lg relative z-20">
        <div className="bg-gradient-to-tr from-violet-200 to-pink-200">
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
                        className="h-5 w-5 text-gray-400"
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
                      className="block w-full mr-2 pl-10 py-2 border border-gray-300 rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search Products"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {/* <Link to="/Cart" className="flex items-center">
                  <button className="ml-4 bg-gradient-to-tr from-violet-500 to-pink-500 p-1 rounded text-white hover:scale-110 transition duration-300 ease-in-out">
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </button>
                  <label className="px-3 cursor-pointer">Cart</label>
                </Link> */}

                <Link to="/login" className="flex items-center">
                  <button className="animated-bg ml-8 bg-gradient-to-tr from-violet-500 to-pink-500 p-1 rounded text-white active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all">
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
                  <label className="px-3 cursor-pointer">Login/Signup</label>
                </Link>

                <Link to="/signup/admin" className="flex items-center">
                  <button className="animated-bg ml-4 bg-gradient-to-tr from-violet-500 to-pink-500 p-1 rounded text-white active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all">
                    <svg
                      viewBox="0 0 24 24"
                      stroke="white"
                      fill="none"
                      strokeWidth="1.5"
                      height="24"
                      width="24"
                    >
                      <path d="M12 14v8H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 016 0v1zm-2 0v-1a1 1 0 00-2 0v1h2z" />
                    </svg>
                  </button>
                  <label className="px-3 cursor-pointer">Sell Here!</label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  export default NavBar;
