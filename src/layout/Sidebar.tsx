import { NavLink } from "react-router-dom";
import { ComputerDesktopIcon as AcmeLogo } from "@heroicons/react/24/solid";
import menuItems from "../helpers/menuItems";

const Sidebar = () => {
  return (
    <nav
      className="group h-screen hidden md:flex flex-col w-24 hover:w-48
      bg-gray-700 dark:bg-neutral-900 text-white transition-all duration-500 ease-in-out py-6"
      aria-label="Menú principal"
    >
      <NavLink to="/" className="w-full text-lg flex justify-center gap-2 py-4">
        <AcmeLogo height={28} width={28} />
        <p className="font-bold text-inherit hidden group-hover:flex">ACME</p>
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
              <span className="group-hover:scale-110 transition-transform duration-300 ease-in-out">
                {item.iconChild}
              </span>
              <span className="hidden group-hover:flex transition-all duration-200 ease-in-out">
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
