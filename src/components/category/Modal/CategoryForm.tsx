import { Input } from "@nextui-org/react";

interface ICategoryProps {
  values: { [key: string]: unknown };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryForm = ({ values, handleInputChange }: ICategoryProps) => {
  return (
    <>
      <Input
        isRequired
        autoFocus
        name="name"
        label="Nombre"
        value={values.name as string}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Nombre del producto"
        className="w-1/2 sm:w-full"
      />
    </>
  );
};

export default CategoryForm;
