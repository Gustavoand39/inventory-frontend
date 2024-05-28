import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  UsersIcon,
  InboxStackIcon,
} from "@heroicons/react/24/solid";

interface MenuItem {
  title: string;
  key: string;
  url: string;
  iconChild?: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    title: "Inicio",
    key: "home",
    url: "/inicio",
    iconChild: <HomeIcon height={24} />,
  },
  {
    title: "Productos",
    key: "products",
    url: "/productos",
    iconChild: <CubeIcon height={24} />,
  },
  {
    title: "Categorías",
    key: "categories",
    url: "/categorias",
    iconChild: <TagIcon height={24} />,
  },
  {
    title: "Usuarios",
    key: "users",
    url: "/usuarios",
    iconChild: <UsersIcon height={24} />,
  },
  {
    title: "Inventario",
    key: "inventory",
    url: "/inventario_log",
    iconChild: <InboxStackIcon height={24} />,
  },
];

export default menuItems;
