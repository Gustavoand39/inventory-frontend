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
                    {item[column.key as keyof T] as ReactNode}
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
