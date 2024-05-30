import { Card, CardHeader } from "@nextui-org/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { IProduct } from "../../../interfaces/Product";

interface IProductCard {
  item: IProduct;
}

const ProductCard = ({ item }: IProductCard) => {
  return (
    <Card
      isPressable
      key={item.id}
      shadow="none"
      className="border border-neutral-200 rounded-lg bg-white hover:shadow-lg transition duration-300 ease-in-out
      dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700"
    >
      <CardHeader className="w-full flex gap-3">
        <ExclamationCircleIcon className="text-red-500" height={28} />

        <div className="flex flex-col items-start">
          <p className="font-semibold text-md">{item.name}</p>
          <p className="text-default-500 text-sm">{item.category}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
