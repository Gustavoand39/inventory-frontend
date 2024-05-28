import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Inventory } from "../../../interfaces/Inventory";
import { getInventoryById } from "../../../services/inventoryService";

const InventoryDetails = () => {
  const [data, setData] = useState<Inventory>({} as Inventory);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getInventoryById(Number(id), setData);
  }, [id]);

  return (
    <>
      <h1>Inventory Details</h1>
    </>
  );
};

export default InventoryDetails;
