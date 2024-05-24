import { IProduct } from "../../../interfaces/Product";

const baseURL = import.meta.env.VITE_APP_APIEND;

const renderImage = (item: IProduct) =>
  item.image ? (
    <img
      src={`${baseURL}/${item.image}`}
      alt={item.name}
      className="object-cover h-10 mx-auto"
    />
  ) : (
    <p>No hay imagen</p>
  );

export default renderImage;
