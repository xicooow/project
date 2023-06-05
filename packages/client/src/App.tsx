import { FunctionComponent } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BrowserRouter } from "./components/BrowserRouter";

const router = createBrowserRouter([{ path: "*", Component: BrowserRouter }]);

export const App: FunctionComponent = () => {
  return <RouterProvider router={router} />;
};
