import { useCallback, useEffect, useState } from "react";

import ProductForm from "../../../components/Inventory/Modal/ProductForm";
import ProductHeader from "../../../components/ui/Table/CustomTableHeader";
import ProductTable from "../../../components/ui/Table/CustomTable";
import ProductFooter from "../../../components/ui/Table/ProductPagination";
import ProductActions from "../../../components/Inventory/Table/RenderActions";
import CustomModal from "../../../components/ui/Modal/CustomModal";

import {
  initialProductColumns,
  initialProductState,
} from "../../../constants/initialStateProducts";
import {
  getListProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../../../services/productService";
import { IProduct } from "../../../interfaces/Product";
import { IColumn } from "../../../interfaces/Table";
import debounce from "../../../helpers/debounce";
import useForm from "../../../hooks/useForm";

const ProductList = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<IColumn<IProduct>[]>(
    initialProductColumns
  );

  const { values, handleInputChange, setFormValue, reset } =
    useForm(initialProductState);

  const clearStates = () => {
    reset(initialProductState);
    setImage(null);
  };

  //* Obtener productos
  const fetchProducts = useCallback(async () => {
    if (searchTerm) {
      await searchProducts({
        word: searchTerm,
        page,
        limit: rowsPerPage,
        setProducts,
        setTotalProducts,
        setTotalPages,
      });
    } else {
      await getListProducts({
        page,
        limit: rowsPerPage,
        setProducts,
        setTotalProducts,
        setTotalPages,
      });
    }
  }, [page, rowsPerPage, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.key === key ? { ...column, visible } : column
      )
    );
  };

  //* Crear
  const openCreateProductModal = () => setIsCreateOpen(true);

  const handleCreateProduct = async () => {
    setIsCreateOpen(false);
    const success = await createProduct(values as IProduct, image);
    if (success) {
      fetchProducts();
      clearStates();
    }
  };

  const closeCreateProductModal = () => {
    setIsCreateOpen(false);
    clearStates();
  };

  //* Editar
  const openEditProductModal = async (id: number) => {
    setIsEditOpen(true);
    await getProduct(id, setFormValue);
  };

  const handleEditProduct = async () => {
    setIsEditOpen(false);
    const success = await updateProduct(values as IProduct, image);
    if (success) {
      fetchProducts();
      clearStates();
    }
  };

  const closeEditProductModal = () => {
    setIsEditOpen(false);
    clearStates();
  };

  //* Eliminar
  const openDeleteProductModal = (product: IProduct) => {
    if (product.id) {
      setSelectedId(product.id);
      setSelectedElement(product.name);
      setIsDeleteOpen(true);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setIsDeleteOpen(false);
    const success = await deleteProduct(id);
    if (success) {
      fetchProducts();
      clearStates();
    }
  };

  const closeDeleteProductModal = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
    setSelectedElement("");
  };

  const productFormComponent = (
    <ProductForm
      values={values}
      handleInputChange={handleInputChange}
      image={image}
      setImage={setImage}
    />
  );

  const searchProduct = debounce({
    func: async (word: string) => {
      setSearchTerm(word);
      setPage(1);
    },
  });

  return (
    <section>
      <ProductTable
        aria="Lista de productos"
        data={products}
        columns={columns}
        topContent={
          <ProductHeader
            columns={initialProductColumns}
            length={totalProducts}
            toggleColumnVisibility={toggleColumnVisibility}
            openCreateModal={openCreateProductModal}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            searchCallback={searchProduct}
          />
        }
        bottomContent={
          <ProductFooter page={page} total={totalPages} callback={setPage} />
        }
        renderActions={(item: IProduct) => {
          return (
            <ProductActions
              item={item}
              openEditModal={openEditProductModal}
              openDeleteModal={openDeleteProductModal}
            />
          );
        }}
      />

      <CustomModal
        title="Crear Producto"
        isOpen={isCreateOpen}
        onClose={closeCreateProductModal}
        onSave={handleCreateProduct}
        renderBody={productFormComponent}
      />

      <CustomModal
        title="Editar Producto"
        isOpen={isEditOpen}
        onClose={closeEditProductModal}
        onSave={handleEditProduct}
        renderBody={productFormComponent}
      />

      <CustomModal
        title={`Eliminar ${selectedElement ? selectedElement : "producto"}`}
        isOpen={isDeleteOpen}
        onClose={closeDeleteProductModal}
        onSave={() => {
          if (selectedId) handleDeleteProduct(selectedId);
        }}
        renderBody={<p>¿Estás seguro de eliminar este producto?</p>}
      />
    </section>
  );
};

export default ProductList;
