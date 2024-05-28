import { useEffect, useState } from "react";

import CustomTable from "../../../components/ui/Table/CustomTable";
import InventoryLogActions from "../../../components/InventoryLog/Table/InventoryLogActions";

import { InventoryLog } from "../../../interfaces/InventoryLog";
import { getLastInventory } from "../../../services/inventoryLogService";
import { recentInventoryLogCols } from "../../../constants/initialStateInventoryLog";

const RecentInventoryLog = () => {
  const [inventoryLog, setInventoryLog] = useState<InventoryLog[]>([]);

  useEffect(() => {
    getLastInventory(setInventoryLog);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold my-4">
        Registro de inventarios recientes
      </h2>
      <CustomTable
        aria="Registro de Inventarios reciente"
        columns={recentInventoryLogCols}
        data={inventoryLog}
        renderActions={(item) => <InventoryLogActions id={item.id} />}
      />
    </>
  );
};

export default RecentInventoryLog;
