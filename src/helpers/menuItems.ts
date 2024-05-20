interface MenuItem {
  title: string;
  key: string;
  url: string;
}

const menuItems: MenuItem[] = [
  // {
  //   title: "Inicio",
  //   key: "home",
  //   url: "/inicio",
  // },
  {
    title: "Inventario",
    key: "inventory",
    url: "/inventario",
  },
  // {
  //   title: "Usuarios",
  //   key: "users",
  //   url: "/usuarios",
  // },
];

export default menuItems;
