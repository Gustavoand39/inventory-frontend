import { Image } from "@nextui-org/react";
import { IProduct } from "../../../interfaces/Product";

const baseURL = import.meta.env.VITE_APP_APIEND;

const renderImage = (item: IProduct) =>
  item.image ? (
    <Image
      width={50}
      className="rounded dark:bg-zinc-700 object-cover p-2"
      alt="Imagen del producto"
      src={`${baseURL}/${item.image}`}
    />
  ) : (
    <p>No hay imagen</p>
  );

export default renderImage;
