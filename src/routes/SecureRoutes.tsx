import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

const Layout = React.lazy(() => import("../layout/Layout"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Products = React.lazy(() => import("../pages/Products"));
const Categories = React.lazy(() => import("../pages/Categories"));
const Users = React.lazy(() => import("../pages/Users"));
const Inventory = React.lazy(() => import("../pages/InventoryLog"));
const InventoryLogDetails = React.lazy(
  () => import("../pages/InventoryLog/InventoryLogDetails/InventoryLogDetails")
);

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
        { path: "/", element: <LoadComponent component={Dashboard} /> },
        { path: "inicio", element: <LoadComponent component={Dashboard} /> },
        {
          path: "productos",
          element: <LoadComponent component={Products} />,
        },
        {
          path: "categorias",
          element: <LoadComponent component={Categories} />,
        },
        { path: "usuarios", element: <LoadComponent component={Users} /> },
        {
          path: "inventario",
          element: <LoadComponent component={Inventory} />,
        },
        {
          path: "inventario_log/:id",
          element: <LoadComponent component={InventoryLogDetails} />,
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
