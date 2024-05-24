import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { IColumn } from "../../../interfaces/Table";

interface ICustomTable<T> {
  aria: string;
  data: T[];
  columns: IColumn<T>[];
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  renderActions?: (item: T) => ReactNode;
}

const CustomTable = <T,>({
  aria,
  data,
  columns,
  topContent,
  bottomContent,
  renderActions,
}: ICustomTable<T>) => {
  // Renderiza el contenido de la celda
  const renderCell = (item: T, column: IColumn<T>): ReactNode => {
    // Si la columna es de acciones, ejecuta la función para renderizar las acciones
    if (column.key === "actions" && renderActions) return renderActions(item);

    // Si la columna tiene una función para renderizar la celda, la ejecuta
    if (column.renderCell) return column.renderCell(item);

    // Si el valor es un string, número o booleano, lo deja como string
    const value = item[column.key as keyof T];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value.toString();
    }

    // Retorna el valor como un nodo de React (Componente, Fragment, etc.)
    return value as ReactNode;
  };

  return (
    <Table
      color="default"
      selectionMode="single"
      aria-label={aria}
      topContent={topContent}
      bottomContent={bottomContent}
    >
      <TableHeader>
        {columns
          .filter((column) => column.visible)
          .map((column) => (
            <TableColumn
              key={String(column.key)}
              className="font-semibold text-sm text-center"
            >
              {column.label}
            </TableColumn>
          ))}
      </TableHeader>

      <TableBody emptyContent={"No hay filas para mostrar."}>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className="border border-transparent border-b-gray-100 dark:border-b-gray-800"
          >
            {columns
              .filter((column) => column.visible)
              .map((column) => (
                <TableCell key={String(column.key)} className="text-center">
                  {renderCell(item, column)}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
