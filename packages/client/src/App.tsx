import { FunctionComponent, useState, useCallback } from "react";

import { Login } from "./components/Login";
import { useStore } from "./hooks/useStore";
import { CreateUser } from "./components/CreateUser";

export const App: FunctionComponent = () => {
  const { user } = useStore();
  const [showCreateUser, setShowCreateUser] = useState(false);

  const changeShowCreateUser = useCallback(
    (value: boolean) =>
      function () {
        setShowCreateUser(value);
      },
    []
  );

  if (user && user._id) {
    return (
      <>
        <h1>Hello {user.display_name}</h1>
      </>
    );
  }

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
