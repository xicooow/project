import {
  useState,
  useCallback,
  FormEventHandler,
  FunctionComponent,
  ChangeEventHandler,
} from "react";
import { Box, Button, Title, Text, TextInput } from "@mantine/core";

import { trpc } from "../trpc";
import { useCacheUser } from "../hooks/useCacheUser";

export type LoginProps = {
  onCreate?: () => void;
};

export const Login: FunctionComponent<LoginProps> = ({ onCreate }) => {
  const { setCacheUser } = useCacheUser();
  const [email, setEmail] = useState("");
  const {
    error,
    isLoading,
    mutate: login,
  } = trpc.loginProcedure.useMutation({ onSuccess: setCacheUser });

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    function (e) {
      e.preventDefault();
      login(email);
    },
    [login, email]
  );

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    function ({ target }) {
      setEmail(target.value);
    },
    []
  );

  return (
    <>
      <Title>Welcome!</Title>
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
            onChange={handleEmailChange}
          />
        </Box>
        <Box>
          <Button
            color="gray"
            type="button"
            variant="subtle"
            onClick={onCreate}
            disabled={isLoading}
          >
            Create
          </Button>
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};
