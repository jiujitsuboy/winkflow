import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">My Insurances</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/insurances">insurances</Link></li> 
          <li><Link to="/my-insurances">home</Link></li>
          <li><Link to="/faq">faq</Link></li>
          <li><Link to="/terms-and-conditions" alt="">term & conditions</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
