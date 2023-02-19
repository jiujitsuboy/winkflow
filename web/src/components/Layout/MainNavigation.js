import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import classes from "./MainNavigation.module.css";
import LogUserInfo from "../user/LogUserInfo";

const MainNavigation = () => {
  const { isAuthenticated, loginWithRedirect, user, logout, isLoading } = useAuth0();
  
  return (
    <header className={classes.header} style={{minWidth:"1280px"}}>
      <div className={classes.logo}>
        <Link to="/">My Insurances</Link>
      </div>
      {!isLoading && (
        <nav>
          <ul>
            {isAuthenticated && (
              <li>
                <Link to="/my-insurances">My Insurences</Link>
              </li>
            )}
            <li>
              <Link to="/insurances">Insurances</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
          {!isAuthenticated && (
            <button className={classes.login} onClick={loginWithRedirect}>
              Login
            </button>
          )}
          {isAuthenticated && <LogUserInfo user={user} logout={logout} />}
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
