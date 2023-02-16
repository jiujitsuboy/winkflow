import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <div>Loading...</div>
      </div>
    ),
  });

  return <Component/>
};

export default AuthenticationGuard;
