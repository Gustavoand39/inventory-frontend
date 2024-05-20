import { useState } from "react";
import { Link } from "react-router-dom";
import menuItems from "../helpers/menuItems";
import Brand from "../components/layout/Brand";

import { HomeIcon, InboxStackIcon, UsersIcon } from "@heroicons/react/24/solid";

interface IMenuIcon {
  [key: string]: JSX.Element;
}

const Sidebar = () => {
  const [isActive, setIsActive] = useState(menuItems[0].key);

  const handleActive = (key: string): void => setIsActive(key);

  const menuIcons: IMenuIcon = {
    home: <HomeIcon height={24} />,
    inventory: <InboxStackIcon height={24} />,
    users: <UsersIcon height={24} />,
  };

  return (
    <nav
      className="h-screen hidden md:flex bg-gray-700 dark:bg-neutral-900 text-white flex-col items-start w-56"
      aria-label="Menú principal"
    >
      <div
        className="w-full hidden md:flex items-center justify-center cursor-pointer py-4 my-4"
        onClick={() => handleActive(menuItems[0].key)}
      >
        <Brand />
      </div>

      <ul className="w-full my-4">
        {menuItems.map((item) => (
          <Link key={item.key} to={item.url}>
            <li
              className={`w-100 flex gap-3 text-lg px-8 py-3 hover:bg-gray-800 cursor-pointer ${
                isActive === item.key ? "font-bold text-cyan-300" : ""
              }`}
              onClick={() => handleActive(item.key)}
            >
              {menuIcons[item.key]}
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
