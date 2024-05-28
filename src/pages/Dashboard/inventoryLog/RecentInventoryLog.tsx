import { useEffect, useState } from "react";

import CustomTable from "../../../components/ui/Table/CustomTable";
import InventoryLogActions from "../../../components/InventoryLog/Table/InventoryLogActions";

import { InventoryLog } from "../../../interfaces/InventoryLog";
import { getLastInventory } from "../../../services/inventoryLogService";
import { recentInventoryLogCols } from "../../../constants/initialStateInventoryLog";

const RecentInventoryLog = () => {
  const [inventory, setInventory] = useState<InventoryLog[]>([]);

  useEffect(() => {
    getLastInventory(setInventory);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold my-4">
        Registros de inventarios recientes
      </h2>
      <CustomTable
        aria="Inventario reciente"
        columns={recentInventoryLogCols}
        data={inventory}
        renderActions={(item) => <InventoryLogActions id={item.id} />}
      />
    </>
  );
};

export default RecentInventoryLog;
