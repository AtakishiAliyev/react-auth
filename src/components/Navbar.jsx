import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/helpers";

const Navbar = ({ links }) => {
  return (
    <nav>
      <button onClick={logout}>Log out</button>

      {links.map((link, i) => (
        <Link key={i} to={link.slug}>
          {link.url}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
