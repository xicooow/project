import {
  Dispatch,
  useState,
  useCallback,
  ChangeEvent,
  SetStateAction,
  FormEventHandler,
  FunctionComponent,
} from "react";
import { CreateUser as Payload } from "@project/types";

import { trpc } from "../trpc";

export type CreateUserProps = {
  onClose?: () => void;
};

export const CreateUser: FunctionComponent<CreateUserProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");

  const {
    error,
    isLoading,
    data: user,
    mutate: createUser,
  } = trpc.userProcedure.useMutation({
    onSuccess() {
      setTimeout(() => onClose && onClose(), 3000);
    },
  });

  const handleFieldChange = useCallback<
    (
      fn: Dispatch<SetStateAction<string>>
    ) => (e: ChangeEvent<HTMLInputElement>) => void
  >(
    (fn) =>
      ({ target }) =>
        fn(target.value),
    []
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const payload: Payload = { email, first_name };
      if (last_name) {
        payload.last_name = last_name;
      }
      createUser(payload);
    },
    [createUser, email, first_name, last_name]
  );

  return (
    <>
      <h1>Create user</h1>
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
            onChange={handleFieldChange(setEmail)}
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            required
            type="text"
            id="first_name"
            value={first_name}
            name="first_name-input"
            onChange={handleFieldChange(setFirstName)}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            name="last_name-input"
            onChange={handleFieldChange(setLastName)}
          />
        </div>
        <div>
          <button type="button" disabled={isLoading} onClick={onClose}>
            Close
          </button>
          <button type="submit" disabled={isLoading}>
            Save
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
