import React from "react";
import { Link } from "react-router-dom";
import { ComputerDesktopIcon as AcmeLogo } from "@heroicons/react/24/solid";

const Brand: React.FC = () => {
  return (
    <Link to="/" className="flex text-lg">
      <AcmeLogo height={28} width={28} />
      <p className="font-bold text-inherit ml-2">ACME</p>
    </Link>
  );
};

export default Brand;
