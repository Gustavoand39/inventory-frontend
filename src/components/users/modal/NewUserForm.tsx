import { Input } from "@nextui-org/react";
import { INewUser } from "../../../interfaces/user";

interface IUserProps {
  values: INewUser;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewUserForm: React.FC<IUserProps> = ({ values, handleInputChange }) => {
  return (
    <>
      <Input
        isRequired
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
        isRequired
        name="user_name"
        label="Nombre de usuario"
        value={values.user_name}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Nombre de usuario"
        className="w-full"
      />

      <Input
        isRequired
        type="email"
        name="email"
        label="Correo electrónico"
        value={values.email}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Correo electrónico"
        className="w-full"
      />

      <Input
        isRequired
        type="password"
        name="password"
        label="Contraseña"
        value={values.password}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Contraseña"
        className="w-full"
      />
    </>
  );
};

export default NewUserForm;
