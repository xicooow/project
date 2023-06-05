import { FunctionComponent } from "react";

import { useStore } from "../hooks/useStore";

export const Panel: FunctionComponent = () => {
  const { user } = useStore();

  return (
    <section>
      <h1>Welcome {user.display_name}!</h1>
    </section>
  );
};
