import React from "react";
import { Button } from "@nextui-org/react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Inventory } from "../../../interfaces/Inventory";
import { useNavigate } from "react-router-dom";

interface RenderActionsProps {
  item: Inventory;
}

const RenderActions: React.FC<RenderActionsProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-2 h-[100%]">
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant="flat"
        onPress={() => navigate(`/inventario/${item.id}`)}
        aria-label="Ver detalles"
      >
        <EyeIcon height={18} />
      </Button>
    </div>
  );
};

export default RenderActions;
