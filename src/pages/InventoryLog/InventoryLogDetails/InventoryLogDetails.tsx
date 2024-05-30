import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";

import RenderState from "../../../components/InventoryLog/RenderState";
import { InventoryLog } from "../../../interfaces/InventoryLog";
import { getInventoryById } from "../../../services/inventoryLogService";

const InventoryLogDetails = () => {
  const [data, setData] = useState<InventoryLog>({} as InventoryLog);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getInventoryById(Number(id), (responseData: InventoryLog) => {
      const parsedData = {
        ...responseData,
        newState: JSON.parse(responseData.newState as unknown as string),
        oldState: JSON.parse(responseData.oldState as unknown as string),
      };
      setData(parsedData);
    });
  }, [id]);

  if (!data.id) return <Spinner color="primary" />;

  return (
    <>
      <Button
        color="default"
        variant="light"
        size="md"
        className="mb-4 font-semibold"
        startContent={<ArrowLeftIcon height={20} />}
        onClick={() => window.history.back()}
      >
        Regresar
      </Button>

      <div className="rounded-xl bg-white shadow-md dark:bg-neutral-900 p-6">
        <p className="text-lg font-semibold mb-2">Detalles del Producto</p>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-200">
            <span className="font-semibold text-gray-800 dark:text-gray-400">
              Producto:
            </span>{" "}
            {data.product}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            <span className="font-semibold text-gray-800 dark:text-gray-400">
              Usuario:
            </span>{" "}
            {data.user}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            <span className="font-semibold text-gray-800 dark:text-gray-400">
              Detalles:
            </span>{" "}
            {data.details}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            <span className="font-semibold text-gray-800 dark:text-gray-400">
              Fecha:
            </span>{" "}
            {new Date(data.date).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
              Nuevo estado:
            </p>
            {data.newState ? RenderState(data.newState) : "N/A"}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
              Estado anterior:
            </p>
            {data.oldState ? RenderState(data.oldState) : "N/A"}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryLogDetails;
