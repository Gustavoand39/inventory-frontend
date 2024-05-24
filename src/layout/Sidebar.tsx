import { Link, useLocation } from "react-router-dom";
import menuItems from "../helpers/menuItems";
import Brand from "../components/layout/Brand";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav
      className="h-screen hidden md:flex bg-gray-700 dark:bg-neutral-900 text-white flex-col items-start w-56"
      aria-label="Menú principal"
    >
      <div className="w-full hidden md:flex items-center justify-center cursor-pointer py-4 my-4">
        <Brand />
      </div>

      <ul className="w-full my-4">
        {menuItems.map((item) => (
          <Link key={item.key} to={item.url}>
            <li
              className={`w-100 flex gap-3 text-lg px-8 py-3 hover:bg-gray-800 cursor-pointer ${
                location.pathname === item.url ? "font-bold text-cyan-300" : ""
              }`}
            >
              {item.iconChild}
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
