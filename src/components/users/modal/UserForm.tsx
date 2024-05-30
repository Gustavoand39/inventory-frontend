import { Input } from "@nextui-org/react";
import { IUser } from "../../../interfaces/user";

interface IUserProps {
  values: IUser;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserForm: React.FC<IUserProps> = ({
  values,
  handleInputChange,
}): JSX.Element => {
  return (
    <>
      <Input
        autoFocus
        name="name"
        label="Nombre"
        value={values.name}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Nombre"
        className="w-full"
      />

      <Input
        name="last_name"
        label="Apellido(s)"
        value={values.last_name}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Apellidos"
        className="w-full"
      />

      <Input
        name="user_name"
        label="Nombre de usuario"
        value={values.user_name}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Nombre de usuario"
        className="w-full"
      />

      <Input
        name="email"
        label="Correo electrónico"
        value={values.email}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Correo electrónico"
        className="w-full"
      />
    </>
  );
};

export default UserForm;
