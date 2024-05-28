import { Button } from "@nextui-org/react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface InventoryLogActionsProps {
  id: number;
}

const InventoryLogActions: React.FC<InventoryLogActionsProps> = ({
  id,
}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-2 h-[100%]">
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant="flat"
        onPress={() => navigate(`/inventario_log/${id}`)}
        aria-label="Ver detalles"
      >
        <EyeIcon height={18} />
      </Button>
    </div>
  );
};

export default InventoryLogActions;
