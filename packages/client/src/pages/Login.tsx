import {
  useState,
  useCallback,
  FormEventHandler,
  FunctionComponent,
  ChangeEventHandler,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Title, Text, TextInput } from "@mantine/core";

import { trpc } from "../trpc";
import { useSession } from "../hooks/useSession";

export const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const { userSession } = useSession();
  const [email, setEmail] = useState("");
  const {
    error,
    isLoading,
    mutate: login,
  } = trpc.loginProcedure.useMutation({
    onSuccess: () => navigate({ pathname: "/activateUser" }),
  });

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

  if (userSession) {
    return <Navigate to={{ pathname: "/panel" }} />;
  }

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
            disabled={isLoading}
            onClick={() => navigate({ pathname: "/createUser" })}
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
