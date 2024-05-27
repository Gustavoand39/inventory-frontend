import { useCallback, useEffect, useState } from "react";

import CategoryTable from "../../../components/ui/Table/CustomTable";
import CategoryHeader from "../../../components/ui/Table/CustomTableHeader";
import CategoryFootter from "../../../components/ui/Table/CustomTableFooter";
import CategoryForm from "../../../components/category/Modal/CategoryForm";
import CategoryActions from "../../../components/category/table/RenderActions";
import CustomModal from "../../../components/ui/Modal/CustomModal";

import {
  initialCategoriesColumns,
  initialCategoryState,
} from "../../../constants/initialStateCategories";
import { ICategory } from "../../../interfaces/Categories";
import {
  getListCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} from "../../../services/categoryService";
import { IColumn } from "../../../interfaces/Table";
import useForm from "../../../hooks/useForm";
import debounce from "../../../helpers/debounce";
import { rowOptions } from "../../../constants/rowOptions";

const ListCategories = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState<number>(rowOptions[0].value);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [columns, setColumns] = useState<IColumn<ICategory>[]>(
    initialCategoriesColumns
  );

  const { values, handleInputChange, setFormValue, reset } =
    useForm(initialCategoryState);

  //* Obtener categorías
  const fetchCategories = useCallback(async () => {
    if (searchTerm) {
      await searchCategories({
        word: searchTerm,
        page,
        limit: rowsPerPage,
        setCategories,
        setTotalCategories,
        setTotalPages,
      });
    } else {
      await getListCategories({
        page,
        limit: rowsPerPage,
        setCategories,
        setTotalCategories,
        setTotalPages,
      });
    }
  }, [page, rowsPerPage, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    const updatedColumns = columns.map((column) =>
      column.key === key ? { ...column, visible } : column
    );
    setColumns(updatedColumns);
  };

  //* Crear categoría
  const openCreateModal = () => setIsCreateOpen(true);

  const handleCreate = async () => {
    setIsCreateOpen(false);
    const success = await createCategory(values as ICategory);
    if (success) {
      closeCreateModal();
      fetchCategories();
    }
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    reset();
  };

  //* Editar Categoría
  const openEditModal = async (id: number) => {
    setIsEditOpen(true);
    const category = await getCategory(id);
    setFormValue(category);
  };

  const handleEdit = async () => {
    setIsEditOpen(false);
    const success = await updateCategory(values as ICategory);
    if (success) {
      fetchCategories();
      reset(initialCategoryState);
    }
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    reset(initialCategoryState);
  };

  //* Eliminar Categoría
  const openDeleteModal = async (category: ICategory) => {
    setSelectedId(category.id);
    setSelectedElement(category.name);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleteOpen(false);
    const success = await deleteCategory(selectedId as number);
    if (success) {
      fetchCategories();
      setSelectedId(null);
      setSelectedElement("");
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
    setSelectedElement("");
  };

  const productFormComponent = (
    <CategoryForm values={values} handleInputChange={handleInputChange} />
  );

  const searchCategory = debounce({
    func: async (word: string) => {
      setSearchTerm(word);
      setPage(1);
    },
  });

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
            openCreateModal={openCreateModal}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            searchCallback={searchCategory}
          />
        }
        bottomContent={
          <CategoryFootter page={page} total={totalPages} callback={setPage} />
        }
        renderActions={(item: ICategory) => {
          return (
            <CategoryActions
              item={item}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          );
        }}
      />

      <CustomModal
        title="Crear Categoría"
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        renderBody={productFormComponent}
        onSave={handleCreate}
      />

      <CustomModal
        title="Editar Categoría"
        isOpen={isEditOpen}
        onClose={closeEditModal}
        renderBody={productFormComponent}
        onSave={handleEdit}
      />

      <CustomModal
        title="Eliminar Categoría"
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onSave={handleDelete}
        renderBody={
          <p>
            ¿Estás seguro de eliminar la categoría{" "}
            <strong>{selectedElement}</strong>?
          </p>
        }
      />
    </section>
  );
};

export default ListCategories;
