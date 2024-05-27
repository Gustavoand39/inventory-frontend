import { IColumn } from "../interfaces/Table";
import { IUser, UserFormValues } from "../interfaces/user";

export const initialUsersColumns: IColumn<IUser>[] = [
  { key: "id", label: "Identificador", visible: false },
  { key: "name", label: "Nombre", visible: true },
  { key: "last_name", label: "Apellido(s)", visible: true },
  { key: "user_name", label: "Usuario", visible: true },
  { key: "email", label: "Correo", visible: true },
  { key: "actions", label: "Acciones", visible: true },
];

export const initialUserState: UserFormValues = {
  name: "",
  last_name: "",
  user_name: "",
  email: "",
  password: "",
};
