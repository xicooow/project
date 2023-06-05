import type { User } from "@project/types";
import { useSessionStorage } from "@mantine/hooks";

export function useSession() {
  const [userSession, setUserSession, clearUserSession] = useSessionStorage<
    User | undefined
  >({ key: "user-session-data" });

  return { userSession, setUserSession, clearUserSession };
}
