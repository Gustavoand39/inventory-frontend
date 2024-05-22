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
  const renderCell = (item: T, columnKey: keyof T): ReactNode => {
    const value = item[columnKey];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value.toString();
    }
    return value as ReactNode;
  };

  return (
    <Table
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
              className="font-semibold text-sm"
            >
              {column.label}
            </TableColumn>
          ))}
      </TableHeader>

      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns
              .filter((column) => column.visible)
              .map((column) =>
                column.key === "actions" ? (
                  <TableCell key={String(column.key)} className="flex gap-2">
                    {renderActions ? renderActions(item) : null}
                  </TableCell>
                ) : (
                  <TableCell key={String(column.key)}>
                    {renderCell(item, column.key as keyof T)}
                  </TableCell>
                )
              )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
