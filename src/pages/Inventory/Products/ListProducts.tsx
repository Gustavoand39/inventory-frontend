import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ProductForm from "../../../components/Inventory/Modal/ProductForm";
import ProductHeader from "../../../components/ui/Table/CustomTableHeader";
import ProductTable from "../../../components/ui/Table/CustomTable";
import ProductFooter from "../../../components/ui/Table/ProductPagination";
import ProductActions from "../../../components/Inventory/Table/RenderActions";
import CustomModal from "../../../components/ui/Modal/CustomModal";
import debounce from "../../../helpers/debounce";

import {
  initialProductColumns,
  initialProductState,
} from "../../../constants/initialStateProducts";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../../../services/products";
import useForm from "../../../hooks/useForm";
import { IProduct } from "../../../interfaces/Product";
import { IColumn } from "../../../interfaces/Table";
import handleAxiosError from "../../../helpers/handleAxiosError";

const ProductList = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [image, setImage] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<IColumn<IProduct>[]>(
    initialProductColumns
  );

  const { values, handleInputChange, setFormValue, reset } =
    useForm(initialProductState);

  //* OBTENER TODOS LOS PRODUCTOS
  const getAllProducts = useCallback(async () => {
    await getProducts({
      page,
      limit: rowsPerPage,
      setProducts,
      setTotalProducts,
      setTotalPages,
    });
  }, [page, rowsPerPage]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.key === key ? { ...column, visible } : column
      )
    );
  };

  const clearStates = () => {
    reset(initialProductState);
    setImage(null);
  };

  //* CREAR PRODUCTO
  const openCreateProductModal = () => setIsCreateOpen(true);

  const handleCreateProduct = async () => {
    setIsCreateOpen(false);
    const success = await createProduct(values, image);
    if (success) {
      getAllProducts();
      clearStates();
    }
  };

  const closeCreateProductModal = () => {
    setIsCreateOpen(false);
    clearStates();
  };

  //* EDITAR PRODUCTO
  const openEditProductModal = async (id: number) => {
    setIsEditOpen(true);
    const resp = await getProduct(id);

    if (resp.error) {
      const error = handleAxiosError(resp.error);
      toast.error(error.message);
      return;
    }

    if (!resp.error && resp.product) setFormValue(resp.product);
  };

  const handleEditProduct = async () => {
    setIsEditOpen(false);
    const success = await updateProduct(values, image);
    if (success) {
      getAllProducts();
      clearStates();
    }
  };

  const closeEditProductModal = () => {
    setIsEditOpen(false);
    clearStates();
  };

  //* ELIMINAR PRODUCTO
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
      getAllProducts();
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

  const searchProduct = debounce(async (word) => {
    await searchProducts(word as string, setProducts);
  });

  // TODO: Mover la lógica de paginación a un hook (si es posible)

  return (
    <section>
      <ProductTable
        aria="Lista de productos"
        data={products}
        columns={columns}
        topContent={
          <ProductHeader
            columns={columns}
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
