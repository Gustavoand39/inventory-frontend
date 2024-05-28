import { Inventory } from "../interfaces/Inventory";
import { IColumn } from "../interfaces/Table";

export const inititalLastInventoryColumns: IColumn<Inventory>[] = [
  { key: "id", label: "Identificador", visible: true },
  { key: "product", label: "Producto", visible: true },
  { key: "user", label: "Usuario", visible: true },
  { key: "details", label: "Detalles", visible: true },
  {
    key: "date",
    label: "Fecha",
    visible: true,
    renderCell: (row: Inventory) => new Date(row.date).toLocaleDateString(),
  },
  { key: "actions", label: "Acciones", visible: true },
];
