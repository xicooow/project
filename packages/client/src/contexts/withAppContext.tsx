import { FunctionComponent, ComponentProps, ComponentType } from "react";

import { AppContext } from "./AppContext";

export function withAppContext<TComponent extends ComponentType<any>>(
  Component: TComponent,
  appContextProps: ComponentProps<typeof AppContext>
) {
  const WithAppContext: FunctionComponent<ComponentProps<TComponent>> = (
    props
  ) => {
    return (
      <AppContext {...appContextProps}>
        <Component {...props} />
      </AppContext>
    );
  };

  return WithAppContext;
}
