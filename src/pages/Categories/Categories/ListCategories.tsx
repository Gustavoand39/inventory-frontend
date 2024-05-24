import { useCallback, useEffect, useState } from "react";

import CategoryTable from "../../../components/ui/Table/CustomTable";
import CategoryHeader from "../../../components/ui/Table/CustomTableHeader";
import CategoryFootter from "../../../components/ui/Table/ProductPagination";

import { initialCategoriesColumns } from "../../../constants/initialStateCategories";
import { ICategory } from "../../../interfaces/Categories";
import { getCategories } from "../../../services/categoryService";

const ListCategories = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [columns, setColumns] = useState(initialCategoriesColumns);

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    const updatedColumns = columns.map((column) =>
      column.key === key ? { ...column, visible } : column
    );
    setColumns(updatedColumns);
  };

  const fetchCategories = useCallback(async () => {
    await getCategories({
      page,
      limit: rowsPerPage,
      setCategories,
      setTotalCategories,
      setTotalPages,
    });
  }, [page, rowsPerPage]);

  return (
    <section>
      <CategoryTable
        aria="Lista de categorías"
        data={categories}
        columns={columns}
        topContent={
          <CategoryHeader
            columns={columns}
            length={totalCategories}
            toggleColumnVisibility={toggleColumnVisibility}
            setRowsPerPage={setRowsPerPage}
          />
        }
        bottomContent={
          <CategoryFootter
            page={totalPages}
            total={totalPages}
            callback={setPage}
          />
        }
      />
    </section>
  );
};

export default ListCategories;
