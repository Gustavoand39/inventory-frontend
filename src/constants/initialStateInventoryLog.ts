import { InventoryLog } from "../interfaces/InventoryLog";
import { IColumn } from "../interfaces/Table";

export const recentInventoryLogCols: IColumn<InventoryLog>[] = [
  { key: "id", label: "Identificador", visible: true },
  { key: "product", label: "Producto", visible: true },
  { key: "user", label: "Usuario", visible: true },
  { key: "details", label: "Detalles", visible: true },
  {
    key: "date",
    label: "Fecha",
    visible: true,
    renderCell: (row: InventoryLog) => new Date(row.date).toLocaleString(),
  },
  { key: "actions", label: "Acciones", visible: true },
];
