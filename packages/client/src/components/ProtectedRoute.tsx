import { FunctionComponent } from "react";
import { To, Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectTo?: To;
};

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  isAllowed,
  redirectTo = "/login",
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
