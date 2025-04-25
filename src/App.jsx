import React from "react";
import Homepage from "./components/pages/homepage";
import { createBrowserRouter, RouterProvider } from "react-router";
import Notfoundpage from "./components/pages/notfoundpage";

let router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: Homepage,
      },
    ],
  },
  {
    path: "*",
    Component: Notfoundpage,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
