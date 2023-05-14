import { FunctionComponent, useState, useCallback } from "react";

import { Login } from "./components/Login";
import { CreateUser } from "./components/CreateUser";

export const App: FunctionComponent = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);

  const changeShowCreateUser = useCallback(
    (value: boolean) => () => setShowCreateUser(value),
    []
  );

  return (
    <section>
      {showCreateUser ? (
        <CreateUser onClose={changeShowCreateUser(false)} />
      ) : (
        <Login onCreate={changeShowCreateUser(true)} />
      )}
    </section>
  );
};
