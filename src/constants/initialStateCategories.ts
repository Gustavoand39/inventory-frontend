import { ICategory, CategoryFormValues } from "../interfaces/Categories";
import { IColumn } from "../interfaces/Table";

export const initialCategoriesColumns: IColumn<ICategory>[] = [
  { key: "id", label: "Identificador", visible: true },
  { key: "name", label: "Nombre", visible: true },
  { key: "actions", label: "Acciones", visible: true },
];

export const initialCategoryState: CategoryFormValues = {
  name: "",
};
