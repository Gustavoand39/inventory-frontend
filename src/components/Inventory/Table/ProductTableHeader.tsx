import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import {
  MagnifyingGlassIcon as SearchIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { ITableHeader } from "../../../interfaces/Table";

interface IProductTableHeader extends ITableHeader {
  openCreateModal: () => void;
}

const ProductTableHeader = ({
  columns,
  length,
  toggleColumnVisibility,
  openCreateModal,
}: IProductTableHeader) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  // Actualiza las columnas visibles del dropdown
  useEffect(() => {
    setVisibleColumns(
      columns.filter((column) => column.visible).map((column) => column.key)
    );
  }, [columns]);

  // Cambia la visibilidad de las columnas
  const handleColumnToggle = (key: string) => {
    const updatedVisibleColumns = visibleColumns.includes(key)
      ? visibleColumns.filter((col) => col !== key)
      : [...visibleColumns, key];
    setVisibleColumns(updatedVisibleColumns);
    toggleColumnVisibility(key, !visibleColumns.includes(key));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[40%]"
          placeholder="Buscar por nombre..."
          startContent={<SearchIcon height={24} />}
        />

        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon height={16} />}
                variant="flat"
              >
                Columnas
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              disallowEmptySelection
              aria-label="Columnas"
              closeOnSelect={false}
              selectionMode="multiple"
              selectedKeys={visibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem
                  key={column.key}
                  className="font-semibold text-lg"
                  onClick={() => handleColumnToggle(column.key)}
                >
                  {column.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            color="primary"
            endContent={<PlusIcon height={20} />}
            onClick={openCreateModal}
          >
            Agregar
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total de Registros: {length}
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select className="bg-transparent outline-none text-default-400 text-small">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ProductTableHeader;
