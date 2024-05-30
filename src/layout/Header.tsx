import { useCallback, useContext } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import {
  ArrowLeftOnRectangleIcon as Logout,
  UserIcon as User,
  Bars3Icon as Menu,
  XMarkIcon as CloseMenu,
} from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";
import Brand from "../components/layout/Brand";
import ThemeSelector from "../components/layout/ThemeSelector";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { auth, logout } = useContext(AuthContext);

  const handleMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, [setIsMenuOpen]);

  return (
    <header
      className={`z-50 flex justify-between items-center md:justify-end bg-white dark:bg-neutral-800 shadow-sm px-4 md:px-12 py-3`}
    >
      <div onClick={handleMenu} className="md:hidden cursor-pointer">
        {isMenuOpen ? <CloseMenu height={32} /> : <Menu height={32} />}
      </div>

      <div className="md:hidden">
        <Brand />
      </div>

      <div className="flex gap-4 items-center">
        <ThemeSelector />

        <Dropdown placement="bottom-end">
          <DropdownTrigger className="hidden md:flex cursor-pointer">
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
