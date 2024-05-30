import React, { useState } from "react";
import { Outlet } from "react-router";
import { Spinner } from "@nextui-org/react";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen relative">
      <Sidebar isMenuOpen={isMenuOpen} />

      <div className="flex flex-col flex-1">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <main className="bg-slate-100 dark:bg-neutral-800 flex-1 overflow-y-auto p-6">
          <React.Suspense fallback={<Spinner />}>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
