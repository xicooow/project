import type { User } from "@project/types";
import { useSessionStorage } from "@mantine/hooks";

export function useCacheUser() {
  const [cacheUser, setCacheUser] = useSessionStorage<User | undefined>({
    key: "cache-user-data",
  });

  return {
    cacheUser,
    setCacheUser,
  };
}
