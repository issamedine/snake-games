import React from "react";
import { Link } from "react-router-dom";


const NavbarMenu = () => {
  return (
    <div className="navbar-menu">
      <div>
        <Link to="/snake">Snake</Link>
      </div>
      <div>
        <Link to="/tictac">Tic-Tac-Toe</Link>
      </div>
    </div>
  );
};

export default NavbarMenu;
