import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { logOut } from '@redux/Slice/UserSlice';
import { setAccountId, setToken } from '@utils/tokenUtil';

// import { } from '@/shadcn/avatar';
import { Button } from '@shadcn/components/ui/button';
import { Input } from '@shadcn/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shadcn/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/components/ui/avatar';
import ThemeToggler from './ThemeToggler';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((state) => state.userDetails);


  const handleLogout = () => {
    setToken('');
    setAccountId('');
    dispatch(logOut());
  };

  const [searchText, setSearchText] = useState('');

  return (
    <header className="bg-background w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="text-lg font-semibold">
          E Commerce
        </Link>

        <div className="hidden max-w-lg flex-1 md:flex">
          <Input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <ThemeToggler />

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full p-2">
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4m-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        0
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 space-y-2 p-3">
                    <div>
                      <p className="text-sm font-medium">8 Items</p>
                      <p className="text-muted-foreground text-xs">Subtotal: $999</p>
                    </div>
                    <Button className="w-full">View Cart</Button>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    {role === 'admin' ? (
                      <DropdownMenuItem
                        onClick={() => {
                          navigate('/admin');
                        }}
                      >
                        Admin Dashboard
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex p-4 md:hidden">
        <Input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>
    </header>
  );
};

export default NavBar;
