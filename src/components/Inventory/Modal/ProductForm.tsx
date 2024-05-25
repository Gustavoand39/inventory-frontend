import { ChangeEvent, useEffect, useState } from "react";
import { Image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import { getCategories } from "../../../services/categoryService";
import { ICategory } from "../../../interfaces/Categories";

type FormValues = { [key: string]: unknown };

const VITE_APP_APIEND = import.meta.env.VITE_APP_APIEND;

interface IProductForm {
  values: FormValues;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  image: File | null;
  setImage: (image: File | null) => void;
}

const ProductForm = ({
  values,
  handleInputChange,
  image,
  setImage,
}: IProductForm) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [src, setSrc] = useState<string | File>("");

  useEffect(() => {
    getCateg();
  }, []);

  useEffect(() => {
    renderImage();
  }, [image, values.image]);

  const getCateg = async (): Promise<void> => {
    await getCategories(setCategories);
  };

  const renderImage = (): void => {
    if (image) {
      setSrc(URL.createObjectURL(image));
      return;
    }

    if (values.image) {
      setSrc(`${VITE_APP_APIEND}/${values.image}`);
      return;
    }
  };

  return (
    <>
      <Input
        autoFocus
        name="name"
        label="Nombre"
        value={values.name as string}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Nombre del producto"
        className="w-1/2 sm:w-full"
      />

      <Textarea
        name="description"
        label="Descripción"
        value={values.description as string}
        onChange={handleInputChange}
        variant="bordered"
        aria-label="Descripción del producto"
        className="w-full"
      />

      <div className="flex w-full gap-4">
        <Input
          name="stock"
          label="Stock"
          value={values.stock?.toString()}
          onChange={handleInputChange}
          variant="bordered"
          type="number"
          aria-label="Stock del producto"
          className="flex-grow"
        />

        <Input
          name="minStock"
          label="Stock Mínimo"
          value={values.minStock?.toString()}
          onChange={handleInputChange}
          variant="bordered"
          type="number"
          aria-label="Stock mínimo del producto"
          className="flex-grow"
        />
      </div>

      <Select
        name="category"
        items={categories}
        value={values.category as string}
        onChange={handleInputChange}
        label="Categoría"
        placeholder="Seleccione una categoría"
        variant="bordered"
        aria-label="Categoría del producto"
        className="w-1/2 sm:w-full"
      >
        {(category) => (
          <SelectItem key={category.id as number}>
            {category.name as string}
          </SelectItem>
        )}
      </Select>

      <div className="flex justify-between items-center">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className={`input-file ${src ? "w-3/4" : "w-full"}`}
        />

        <Image
          width={80}
          className={src ? "flex" : "hidden"}
          alt="Imagen del producto"
          src={src as string}
        />
      </div>
    </>
  );
};

export default ProductForm;
