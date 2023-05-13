import {
  useState,
  useCallback,
  FormEventHandler,
  FunctionComponent,
} from "react";

import { trpc } from "../trpc";

export const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const {
    error,
    isLoading,
    data: user,
    mutate: login,
  } = trpc.login.useMutation();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      login(email);
    },
    [login, email]
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
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
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
