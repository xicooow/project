import {
  Dispatch,
  useState,
  useCallback,
  ChangeEvent,
  SetStateAction,
  FormEventHandler,
  FunctionComponent,
} from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser as Payload } from "@project/types";
import { Box, Button, Title, Text, TextInput } from "@mantine/core";

import { trpc } from "../trpc";
import { useSession } from "../hooks/useSession";

export const CreateUser: FunctionComponent = () => {
  const navigate = useNavigate();
  const { clearUserSession } = useSession();
  const [email, setEmail] = useState("");
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");

  const {
    error,
    isLoading,
    mutate: createUser,
  } = trpc.userProcedure.useMutation({
    onSuccess: () => {
      clearUserSession();
      navigate({ pathname: "/login" });
    },
  });

  const handleFieldChange = useCallback<
    (
      fn: Dispatch<SetStateAction<string>>
    ) => (e: ChangeEvent<HTMLInputElement>) => void
  >(
    (fn) =>
      function ({ target }) {
        fn(target.value);
      },
    []
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    function (e) {
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
            disabled={isLoading}
            onClick={() => navigate({ pathname: "/login" })}
          >
            Close
          </Button>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};
