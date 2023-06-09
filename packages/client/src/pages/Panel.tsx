import { FunctionComponent } from "react";

import { useSession } from "../hooks/useSession";

export const Panel: FunctionComponent = () => {
  const { userSession: user } = useSession();

  return (
    <section>
      <h1>Welcome {user?.display_name}!</h1>
    </section>
  );
};
