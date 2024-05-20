import { useContext, useEffect, useRef, useState } from "react";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  UserIcon as User,
  LockClosedIcon as Lock,
} from "@heroicons/react/24/solid";

import useForm from "../../hooks/useForm";
import { AuthContext } from "../../context/AuthContext";

import handleAxiosError from "../../helpers/handleAxiosError";

const Login = () => {
  const [remember, setRemember] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const passInput = useRef<HTMLInputElement>(null);
  const rememberInput = useRef<HTMLInputElement>(null);

  const { login } = useContext(AuthContext);

  const { values, handleInputChange, setFormValue } = useForm({
    username: "",
    password: "",
  });

  // Verifica si hay un usuario guardado en el localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setRemember(true);
      setFormValue({ ...values, username: user });
      rememberInput.current?.click();
      passInput.current?.focus();
    } else {
      nameInput.current?.focus();
    }
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const { username, password } = values;

    try {
      if (!username || !password) {
        toast.error("Debes completar los campos");
        return;
      }

      await login(username, password);

      remember
        ? localStorage.setItem("user", username)
        : localStorage.removeItem("user");
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  const handleRemember = (): void => setRemember(remember ? false : true);

  return (
    <div
      className="flex justify-center items-center h-screen 
      bg-gradient-to-br from-emerald-400 via-sky-500 to-indigo-400 
      dark:bg-gradient-to-tr dark:from-sky-950 dark:to-sky-700"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-2/3 md:w-3/6 lg:w-2/6 p-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-white mb-8">
          ¡Bienvenido!
        </h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            ref={nameInput}
            name="username"
            type="text"
            variant="faded"
            color="default"
            className="font-semibold"
            label="Usuario"
            labelPlacement="outside"
            aria-label="Usuario"
            startContent={<User className="w-5 h-5 text-blue-500" />}
            value={values.username.toString()}
            onChange={handleInputChange}
          />

          <Input
            ref={passInput}
            name="password"
            type="password"
            variant="faded"
            color="default"
            className="font-semibold"
            label="Contraseña"
            labelPlacement="outside"
            aria-label="Contraseña"
            startContent={<Lock className="w-5 h-5 text-blue-500" />}
            onChange={handleInputChange}
          />

          <Checkbox
            size="md"
            color="primary"
            aria-label="Recordar usuario"
            onClick={handleRemember}
            checked={remember}
            ref={rememberInput}
          >
            Recordar usuario
          </Checkbox>

          <Button
            className="text-md font-semibold mt-1"
            color="primary"
            type="submit"
            aria-label="Iniciar sesión"
            fullWidth
          >
            Iniciar sesión
          </Button>

          <NavLink
            to="/"
            className="text-end text-sm text-gray-500 dark:text-gray-300 hover:text-blue-600 transition-all mt-1"
            aria-label="¿Olvidaste tu contraseña?"
          >
            ¿Olvidaste tu contraseña?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
