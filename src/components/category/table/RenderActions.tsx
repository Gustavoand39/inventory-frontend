import React from "react";
import { Button } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ICategory } from "../../../interfaces/Categories";

interface RenderActionsProps {
  item: ICategory;
  openEditModal: (id: number) => void;
  openDeleteModal: (item: ICategory) => void;
}

const RenderActions: React.FC<RenderActionsProps> = ({
  item,
  openEditModal,
  openDeleteModal,
}) => (
  <div className="flex justify-center gap-2 h-[100%]">
    <Button
      isIconOnly
      size="sm"
      color="primary"
      variant="flat"
      onPress={() => openEditModal(item.id as number)}
    >
      <PencilIcon height={18} />
    </Button>

    <Button
      isIconOnly
      size="sm"
      color="danger"
      variant="flat"
      onPress={() => openDeleteModal(item)}
    >
      <TrashIcon height={18} />
    </Button>
  </div>
);

export default RenderActions;
