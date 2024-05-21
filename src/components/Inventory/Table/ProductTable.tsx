import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { IProduct } from "../../../interfaces/Product";
import { IColumn } from "../../../interfaces/Table";

interface ICustomTable<T> {
  aria: string;
  data: T[];
  columns: IColumn[];
  topContent?: JSX.Element;
  renderActions?: (item: T) => JSX.Element;
}

const ProductTable = <T extends IProduct>({
  aria,
  data,
  columns,
  topContent,
  renderActions,
}: ICustomTable<T>) => {
  return (
    <>
      <Table aria-label={aria} topContent={topContent}>
        <TableHeader>
          {columns
            .filter((column) => column.visible)
            .map((column) => (
              <TableColumn key={column.key} className="font-semibold text-sm">
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
                    <TableCell key={column.key} className="flex gap-2">
                      {renderActions && renderActions(item)}
                    </TableCell>
                  ) : (
                    <TableCell key={column.key}>
                      {item[column.key as keyof IProduct]}
                    </TableCell>
                  )
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductTable;
