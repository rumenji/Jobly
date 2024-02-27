import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../Auth/UserContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function ProtectedRoute({ children }) {
  const { currUser } = useContext(UserContext);

  if (!currUser) {
    return <Navigate to="/login" replace={true} />
  }
  console.log(children)
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
