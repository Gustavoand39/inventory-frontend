import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

const Layout = React.lazy(() => import("../layout/Layout"));
const Inventory = React.lazy(() => import("../pages/Inventory"));

interface IRoute {
  path?: string;
  element?: JSX.Element;
  children?: {
    path: string;
    element: JSX.Element;
  }[];
}

interface ILoadComponent {
  component: React.FC;
}

const SecureRoutes: React.FC<IRoute> = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <LoadComponent component={Inventory} /> },
        {
          path: "inventario",
          element: <LoadComponent component={Inventory} />,
        },
      ],
    },
  ]);
};

const LoadComponent = ({ component: Component }: ILoadComponent) => (
  <Suspense
    fallback={
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    }
  >
    <Component />
  </Suspense>
);

export default SecureRoutes;
