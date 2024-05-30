import { NavLink } from "react-router-dom";
import { ComputerDesktopIcon as AcmeLogo } from "@heroicons/react/24/solid";
import menuItems from "../helpers/menuItems";
import { useRef } from "react";

interface SidebarProps {
  isMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen }) => {
  const refNav = useRef<HTMLDivElement>(null);

  return (
    <nav
      ref={refNav}
      className={`group w-24 h-screen bg-gray-700 text-white absolute z-50 md:relative md:inline-block md:w-24 md:hover:w-48 
      transition-all duration-500 ease-in-out py-6 ${
        isMenuOpen ? "absolute w-48" : "hidden"
      }`}
      aria-label="Menú principal"
    >
      <NavLink
        to="/"
        className="w-full text-lg flex justify-center opacity-0 md:opacity-100 gap-2 py-4"
      >
        <AcmeLogo height={28} width={28} />
        <p className="font-bold text-inherit hidden md:group-hover:flex">
          ACME
        </p>
      </NavLink>

      <ul className="w-full flex flex-col gap-2 my-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.url}
            className={({ isActive }) =>
              `w-full flex justify-start gap-4 px-8 py-2 hover:bg-gray-800 focus:outline-none cursor-pointer ${
                isActive ? "font-bold text-teal-300" : ""
              }`
            }
          >
            <li className="w-full flex justify-start gap-4 py-3">
              <span className="transition-transform duration-300 ease-in-out">
                {item.iconChild}
              </span>
              <span className="flex md:hidden md:group-hover:flex md:transition-all md:duration-200 ease-in-out">
                {item.title}
              </span>
            </li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
