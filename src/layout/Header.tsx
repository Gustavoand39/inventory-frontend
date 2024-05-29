import { useContext, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import {
  ArrowLeftEndOnRectangleIcon as Logout,
  UserIcon as User,
  MoonIcon as Dark,
  SunIcon as Light,
  ComputerDesktopIcon as System,
  Bars3Icon as Menu,
  XMarkIcon as CloseMenu,
} from "@heroicons/react/24/solid";

import { AuthContext } from "../context/AuthContext";
import Brand from "../components/layout/Brand";
import useTheme from "../hooks/useTheme";

const Header: React.FC = () => {
  const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { auth, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const handleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`z-50 flex justify-between items-center md:justify-end bg-white dark:bg-neutral-800 shadow-sm px-12 py-3`}
    >
      <div onClick={handleMenu} className="md:hidden cursor-pointer">
        {isMenuOpen ? <CloseMenu height={32} /> : <Menu height={32} />}
      </div>

      <div className="md:hidden">
        <Brand />
      </div>

      <div className="flex gap-4">
        <Button
          isIconOnly
          variant="light"
          className="focus:bg-slate-200 focus:ring-2 focus:ring-gray-200 dark:focus:bg-neutral-600 dark:focus:ring-neutral-600"
          onClick={() => {
            setIsOpenTheme(!isOpenTheme);
          }}
          aria-label="Cambiar tema"
        >
          {
            {
              system: <System height={24} />,
              light: <Light height={24} />,
              dark: <Dark height={24} />,
            }[theme]
          }
        </Button>

        <div
          className={`w-40 absolute top-20 right-12 flex flex-col items-start rounded-lg border border-gray-200 shadow-md p-1 
          bg-white dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-950 ${
            isOpenTheme ? "group-active:flex" : "hidden"
          }`}
        >
          <Button
            variant="light"
            className="w-full flex justify-start font-semibold"
            startContent={<System height={24} />}
            onClick={() => {
              toggleTheme("system");
              setIsOpenTheme(false);
            }}
            aria-label="Tema del sistema"
          >
            Sistema
          </Button>

          <Button
            variant="light"
            className="w-full justify-start font-semibold"
            startContent={<Light height={24} />}
            onClick={() => {
              toggleTheme("light");
              setIsOpenTheme(false);
            }}
            aria-label="Tema claro"
          >
            Claro
          </Button>

          <Button
            variant="light"
            className="w-full justify-start font-semibold"
            startContent={<Dark height={24} />}
            onClick={() => {
              toggleTheme("dark");
              setIsOpenTheme(false);
            }}
            aria-label="Tema oscuro"
          >
            Oscuro
          </Button>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            <Avatar
              icon={<User height={24} />}
              classNames={{
                base: "bg-[#FFB457]",
                icon: "text-black/80",
              }}
            />
          </DropdownTrigger>

          <DropdownMenu variant="solid" aria-label="Acciones del perfil">
            <DropdownItem
              isReadOnly
              key="profile"
              className=""
              textValue="Profile"
              aria-label="Perfil"
            >
              <p className="font-bold">¡Hola, {auth.username}!</p>
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              startContent={<Logout height={24} width={24} />}
              onClick={logout}
              aria-label="Cerrar sesión"
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
