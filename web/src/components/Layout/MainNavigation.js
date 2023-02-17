import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import classes from "./MainNavigation.module.css";
import LogUserInfo from "../user/LogUserInfo";
import { getUserByName, createUser } from "../../api/user";
import UserContext from "../../store/auth-context";

const MainNavigation = () => {
  const { isAuthenticated, loginWithRedirect, user, logout, isLoading } =
    useAuth0();
  const userContext = useContext(UserContext);

  const getUserIdByName = async (name) => {
    const resp = await getUserByName(name);

    if (resp.success && resp.data.getUserByName) {
      userContext.storeUserId(resp.data.getUserByName.id);
    } else {
      const resp = await createUser(name);
      if (resp.success && resp.data.createUser) {
        console.log("user created!");
      }
    }
  };

  useEffect(() => {
    if (user) {
      getUserIdByName(user.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">My Insurances</Link>
      </div>
      {!isLoading && (
        <nav>
          <ul>
            {isAuthenticated && (
              <li>
                <Link to="/my-insurances">my insurences</Link>
              </li>
            )}
            <li>
              <Link to="/insurances">insurances</Link>
            </li>
            <li>
              <Link to="/faq">faq</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" alt="">
                term & conditions
              </Link>
            </li>
          </ul>
          {!isAuthenticated && (
            <button className={classes.login} onClick={loginWithRedirect}>
              Login
            </button>
          )}
          {/* {<button className={classes.login} onClick={getUserIdByName}>Call</button>} */}
          {isAuthenticated && <LogUserInfo user={user} logout={logout} />}
        </nav>
      )}
    </header>
  );
};

export default MainNavigation;
