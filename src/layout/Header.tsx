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
  MoonIcon as Moon,
  SunIcon as Sun,
  Bars3Icon as Menu,
  XMarkIcon as CloseMenu,
} from "@heroicons/react/24/solid";

import { AuthContext } from "../context/AuthContext";
import Brand from "../components/layout/Brand";
import useTheme from "../hooks/useTheme";

type ThemeIconProps = {
  isDarkMode: boolean;
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { auth, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useTheme();

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
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          <ThemeIcon isDarkMode={isDarkMode} />
        </Button>

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

const ThemeIcon: React.FC<ThemeIconProps> = ({ isDarkMode }) => {
  return isDarkMode ? (
    <Moon height={24} width={24} />
  ) : (
    <Sun height={24} width={24} />
  );
};

export default Header;
