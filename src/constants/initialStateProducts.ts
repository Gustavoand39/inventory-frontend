import {
  IProduct,
  ProductFormValues,
} from "../interfaces/Product";
import { IColumn } from "../interfaces/Table";
import renderImage from "../components/Inventory/Table/renderImage";

export const initialProductColumns: IColumn<IProduct>[] = [
  { key: "id", label: "Identificador", visible: false },
  { key: "name", label: "Nombre", visible: true },
  { key: "description", label: "Descripción", visible: false },
  { key: "stock", label: "Stock", visible: true },
  { key: "minStock", label: "Stock Mínimo", visible: true },
  {
    key: "image",
    label: "Imagen",
    visible: true,
    renderCell: renderImage,
  },
  { key: "category", label: "Categoría", visible: true },
  { key: "actions", label: "Acciones", visible: true },
];

export const initialProductState: ProductFormValues = {
  name: "",
  description: "",
  stock: 0,
  minStock: 0,
  image: "",
  category: 0,
};
