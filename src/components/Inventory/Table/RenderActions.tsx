import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { IProduct } from "../../../interfaces/Product";

interface IRenderActions {
  product: IProduct;
  openEditModal: (id: number) => void;
  openDeleteModal: (product: IProduct) => void;
}

const RenderActions: React.FC<IRenderActions> = ({
  product,
  openEditModal,
  openDeleteModal,
}) => (
  <div className="flex gap-2">
    <Button
      isIconOnly
      size="sm"
      color="primary"
      variant="flat"
      onPress={() => {
        if (product.id) openEditModal(product.id);
      }}
    >
      <PencilIcon height={18} />
    </Button>

    <Button
      isIconOnly
      size="sm"
      color="danger"
      variant="flat"
      onPress={() => {
        if (product.id) openDeleteModal(product);
      }}
    >
      <TrashIcon height={18} />
    </Button>
  </div>
);

export default RenderActions;
