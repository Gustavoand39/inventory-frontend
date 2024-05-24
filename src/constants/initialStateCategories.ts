import { ICategory } from "../interfaces/Categories";
import { IColumn } from "../interfaces/Table";

export const initialCategoriesColumns: IColumn<ICategory>[] = [
  { key: "id", label: "Identificador", visible: true },
  { key: "name", label: "Nombre", visible: true },
];

export const initialProductState = {
  name: "",
};
