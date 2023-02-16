import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import classes from "./MainNavigation.module.css"

const MainNavigation = () => {
  const {isAuthenticated, loginWithRedirect, user, logout, isLoading} = useAuth0()
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">My Insurances</Link>
      </div>
      {!isLoading && (
        <nav>
        <ul>
          {isAuthenticated && <li><Link to="/my-insurances">my insurences</Link></li>}
          <li><Link to="/insurances">insurances</Link></li>
          <li><Link to="/faq">faq</Link></li>
          <li><Link to="/terms-and-conditions" alt="">term & conditions</Link></li>
        </ul>
        {!isAuthenticated && <button className={classes.login} onClick={loginWithRedirect}>Login</button>}
        {isAuthenticated && <div className={classes.user_profile}>
          <img className={classes.user_profile__picture} src={user.picture} alt={user.name}/>
          <div>
            <div className={classes.user_profile__name}>{user.name}</div>
            <button className={classes.logout} onClick={logout}>Logout</button>
          </div>
        </div>}
      </nav>
      )}
    </header>
  );
};

export default MainNavigation;
