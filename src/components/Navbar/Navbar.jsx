import React from "react";
import { useDispatch } from "react-redux";
import Logo from "../../assets/lws-logo-dark.svg";
import { userLogout } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(userLogout());
    localStorage.clear();
  };

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <img className="h-10" src={Logo} />
          <ul>
            <li className="text-white cursor-pointer">
              <span onClick={Logout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
