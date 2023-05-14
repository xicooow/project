import {
  useState,
  useCallback,
  FormEventHandler,
  FunctionComponent,
  ChangeEventHandler,
} from "react";

import { trpc } from "../trpc";

export type LoginProps = {
  onCreate?: () => void;
};

export const Login: FunctionComponent<LoginProps> = ({ onCreate }) => {
  const [email, setEmail] = useState("");
  const {
    error,
    isLoading,
    data: user,
    mutate: login,
  } = trpc.loginProcedure.useMutation();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      login(email);
    },
    [login, email]
  );

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => setEmail(target.value),
    []
  );

  return (
    <>
      <h1>Welcome!</h1>
      {error && (
        <p>
          {error.data?.httpStatus || 500} - {error.message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            type="email"
            value={email}
            name="email-input"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <button type="button" disabled={isLoading} onClick={onCreate}>
            Create
          </button>
          <button type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
      {user && (
        <p>
          #{user.session_count} - {user.display_name}
        </p>
      )}
    </>
  );
};
