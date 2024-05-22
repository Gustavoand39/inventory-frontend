import { IProduct } from "../interfaces/Product";
import { IColumn } from "../interfaces/Table";

export const initialProductColumns: IColumn<IProduct>[] = [
  { key: "id", label: "Identificador", visible: false },
  { key: "name", label: "Nombre", visible: true },
  { key: "description", label: "Descripción", visible: false },
  { key: "stock", label: "Stock", visible: true },
  { key: "minStock", label: "Stock Mínimo", visible: true },
  { key: "image", label: "Imagen", visible: false },
  { key: "category", label: "Categoría", visible: true },
  { key: "actions", label: "Acciones", visible: true },
];

export const initialProductState = {
  name: "",
  description: "",
  stock: 0,
  minStock: 0,
  image: "",
  category: 0,
};
