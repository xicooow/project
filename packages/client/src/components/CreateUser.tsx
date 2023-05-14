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
import { Box, Button, Title, Text, TextInput } from "@mantine/core";

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
      <Title>Create user</Title>
      {error && (
        <Text>
          {error.data?.httpStatus || 500} - {error.message}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <Box>
          <TextInput
            required
            id="email"
            type="email"
            label="Email"
            value={email}
            name="email-input"
            onChange={handleFieldChange(setEmail)}
          />
        </Box>
        <Box>
          <TextInput
            required
            type="text"
            id="first_name"
            label="First Name"
            value={first_name}
            name="first_name-input"
            onChange={handleFieldChange(setFirstName)}
          />
        </Box>
        <Box>
          <TextInput
            type="text"
            id="last_name"
            label="Last Name"
            value={last_name}
            name="last_name-input"
            onChange={handleFieldChange(setLastName)}
          />
        </Box>
        <Box>
          <Button
            color="gray"
            type="button"
            variant="subtle"
            onClick={onClose}
            disabled={isLoading}
          >
            Close
          </Button>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </Box>
      </form>
      {user && (
        <Text>
          #{user.session_count} - {user.display_name}
        </Text>
      )}
    </>
  );
};
