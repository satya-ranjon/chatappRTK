import React from "react";
import Logo from "../../assets/lws-logo-dark.svg";

const Navbar = () => {
  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <img className="h-10" src={Logo} />
          <ul>
            <li className="text-white">
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
