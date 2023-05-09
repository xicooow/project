import { FunctionComponent } from "react";

import { trpc } from "../trpc";

export const Roles: FunctionComponent = () => {
  const { data } = trpc.getRoles.useQuery();
  return (
    <section>
      <div>Roles</div>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </section>
  );
};
