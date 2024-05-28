import { useEffect, useState } from "react";
import CustomTable from "../../../components/ui/Table/CustomTable";
import { getLastInventory } from "../../../services/inventoryService";
import { Inventory } from "../../../interfaces/Inventory";
import { inititalLastInventoryColumns } from "../../../constants/initialStateInventory";
import InventoryActions from "../../../components/Inventory/Table/RenderActions";

const RecentInventory = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    getLastInventory(setInventory);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold my-4">Inventario reciente</h2>
      <CustomTable
        aria="Inventario reciente"
        columns={inititalLastInventoryColumns}
        data={inventory}
        renderActions={(item) => <InventoryActions item={item} />}
      />
    </>
  );
};

export default RecentInventory;
