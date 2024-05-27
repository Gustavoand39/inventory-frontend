import { Link, useLocation } from "react-router-dom";
import { ComputerDesktopIcon as AcmeLogo } from "@heroicons/react/24/solid";
import menuItems from "../helpers/menuItems";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav
      className="group h-screen hidden md:flex flex-col w-24 hover:w-56
      bg-gray-700 dark:bg-neutral-900 text-white transition-all duration-500 ease-in-out py-6"
      aria-label="Menú principal"
    >
      <Link to="/" className="w-full text-lg flex justify-center gap-2 py-4">
        <AcmeLogo height={28} width={28} />
        <p className="font-bold text-inherit hidden group-hover:flex">ACME</p>
      </Link>

      <ul className="w-full my-4">
        {menuItems.map((item) => (
          <Link key={item.key} to={item.url}>
            <li
              className={`w-full flex justify-start gap-4 px-8 py-3 hover:bg-gray-800 focus:outline-none cursor-pointer ${
                location.pathname === item.url ? "font-bold text-cyan-300" : ""
              }`}
            >
              <span className="group-hover:scale-110 transition-transform duration-300 ease-in-out">
                {item.iconChild}
              </span>
              <span className="hidden group-hover:flex transition-all duration-200 ease-in-out">
                {item.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
