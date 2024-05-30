import { useState, ChangeEvent } from "react";

type FormValues = { [key: string]: unknown };

const useForm = <T extends FormValues>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setFormValue = (form: T) => {
    setValues(form);
  };

  const reset = (newState: T = initialState) => {
    setValues(newState);
  };

  return { values, handleInputChange, setFormValue, reset } as const;
};

export default useForm;
