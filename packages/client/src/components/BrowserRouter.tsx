import { Routes, Route } from "react-router-dom";
import { FunctionComponent, useMemo } from "react";

import { Login } from "./Login";
import { Panel } from "./Panel";
import { CreateUser } from "./CreateUser";
import { ProtectedRoute } from "./ProtectedRoute";

import { useSession } from "../hooks/useSession";

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
        <Route element={<ProtectedRoute isAllowed={isLogged} />}>
          <Route path="panel" element={<Panel />} />
        </Route>
      </Route>
    </Routes>
  );
};
