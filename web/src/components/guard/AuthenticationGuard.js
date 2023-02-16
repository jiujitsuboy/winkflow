import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingSpinner from "../UI/LoadingSpinner"

const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="centered">
        <LoadingSpinner/>
      </div>
    ),
  });

  return <Component/>
};

export default AuthenticationGuard;
