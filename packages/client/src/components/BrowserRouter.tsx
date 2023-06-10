import { Routes, Route } from "react-router-dom";
import { FunctionComponent, useMemo } from "react";

import { Login } from "../pages/Login";
import { Panel } from "../pages/Panel";
import { CreateUser } from "../pages/CreateUser";
import { ActivateUser } from "../pages/ActivateUser";

import { useSession } from "../hooks/useSession";
import { ProtectedRoute } from "./ProtectedRoute";

export const BrowserRouter: FunctionComponent = () => {
  const { userSession } = useSession();
  const { isLogged } = useMemo(() => {
    if (!userSession) {
      return { isLogged: false };
    }

    return { isLogged: true, level: userSession.role.level };
  }, [userSession]);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="createUser" element={<CreateUser />} />
        <Route path="activateUser" element={<ActivateUser />} />
        <Route path="panel" element={<ProtectedRoute isAllowed={isLogged} />}>
          <Route index element={<Panel />} />
        </Route>
      </Route>
    </Routes>
  );
};
