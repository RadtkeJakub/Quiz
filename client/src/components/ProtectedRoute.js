import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const isLogged = false;

  return (
    <Route {...rest}>
      {isLogged === true ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
