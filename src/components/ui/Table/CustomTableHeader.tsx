import { useCallback, useEffect, useState } from "react";
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

import { rowOptions } from "../../../constants/rowOptions";

interface ITableHeader {
  columns: { key: string; label: string; visible: boolean }[];
  length: number;
  toggleColumnVisibility: (key: string, visible: boolean) => void;
  openCreateModal?: () => void;
}

interface IProductTableHeader extends ITableHeader {
  openCreateModal: () => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setPage: (page: number) => void;
  searchCallback: (search: string) => void;
}

const CustomTableHeader = ({
  columns,
  length,
  toggleColumnVisibility,
  openCreateModal,
  setRowsPerPage,
  setPage,
  searchCallback,
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

  // Cambia la cantidad de filas por página
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[40%]"
          placeholder="Buscar por nombre..."
          startContent={<SearchIcon height={24} />}
          onChange={(e) => searchCallback(e.target.value)}
          onClear={() => searchCallback("")}
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
        <span className="text-default-400 text-small dark:text-slate-400">
          Total de Registros: {length}
        </span>

        <label className="flex items-center text-default-400 text-small dark:text-slate-400">
          Filas por página:
          <select
            className="bg-transparent outline-none font-semibold text-small cursor-pointer px-2
            border border-transparent rounded-md hover:border-gray-300 ml-1"
            onChange={onRowsPerPageChange}
          >
            {rowOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default CustomTableHeader;
