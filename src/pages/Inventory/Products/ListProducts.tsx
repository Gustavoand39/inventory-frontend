import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

import ProductForm from "../../../components/Inventory/Modal/ProductForm";
import ProductHeader from "../../../components/Inventory/Table/ProductTableHeader";
import ProductTable from "../../../components/Inventory/Table/ProductTable";
import ProductPagination from "../../../components/Inventory/Table/ProductPagination";
import CustomModal from "../../../components/ui/Modal/CustomModal";

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
} from "../../../services/products";
import useForm from "../../../hooks/useForm";
import { IProduct } from "../../../interfaces/Product";
import { IColumn } from "../../../interfaces/Table";
import handleAxiosError from "../../../helpers/handleAxiosError";

const ProductList = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>("producto");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<IColumn[]>(initialProductColumns);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { values, handleInputChange, setFormValue, reset } =
    useForm(initialProductState);

  useEffect(() => {
    getAllProducts();
  }, [rowsPerPage]);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.key === key ? { ...column, visible } : column
      )
    );
  };

  //* OBTENER TODOS LOS PRODUCTOS
  const getAllProducts = async () => {
    try {
      const resp = await getProducts(page, rowsPerPage);
      if (resp.products && resp.total) {
        setProducts(resp.products);
        setTotalPages(resp.total);
      }
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  //* CREAR PRODUCTO
  const openCreateProductModal = () => {
    reset(initialProductState);
    setIsCreateOpen(true);
    setImage(null);
  };

  const handleCreateProduct = async () => {
    try {
      setIsCreateOpen(false);
      const resp = await createProduct(values, image);
      if (!resp.error) {
        toast.success(resp.message);
        const { products } = await getProducts(page, rowsPerPage);
        if (products) setProducts(products);
        reset(initialProductState);
      }
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  //* EDITAR PRODUCTO
  const openEditProductModal = async (id: number) => {
    reset(initialProductState);
    try {
      const resp = await getProduct(id);
      if (!resp.error && resp.product) {
        setFormValue(resp.product);
        setIsEditOpen(true);
      }
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  const handleEditProduct = async () => {
    try {
      setIsEditOpen(false);
      const resp = await updateProduct(values, image);
      toast.success(resp.message);
      const { products } = await getProducts(page, rowsPerPage);
      if (products) setProducts(products);
      reset(initialProductState);
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
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
    try {
      setIsDeleteOpen(false);
      await deleteProduct(id);
      const { error } = await getProducts(page, rowsPerPage);
      if (!error) {
        setProducts(products.filter((product) => product.id !== id));
        setSelectedId(null);
        setSelectedElement("producto");
        toast.success("Producto eliminado correctamente");
      }
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  const renderActions = (product: IProduct) => (
    <div className="flex gap-2">
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant="flat"
        onPress={() => {
          if (product.id) openEditProductModal(product.id);
        }}
      >
        <PencilIcon height={18} />
      </Button>

      <Button
        isIconOnly
        size="sm"
        color="danger"
        variant="flat"
        onPress={() => {
          if (product.id) openDeleteProductModal(product);
        }}
      >
        <TrashIcon height={18} />
      </Button>
    </div>
  );

  const productFormComponent = (
    <ProductForm
      values={values}
      handleInputChange={handleInputChange}
      image={image}
      setImage={setImage}
    />
  );

  return (
    <section>
      <ProductTable
        aria="Lista de productos"
        data={products}
        columns={columns}
        topContent={
          <ProductHeader
            columns={columns}
            length={totalPages}
            toggleColumnVisibility={toggleColumnVisibility}
            openCreateModal={openCreateProductModal}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
          />
        }
        Pagination={() => (
          <ProductPagination page={page} total={5} callback={setPage} />
        )}
        renderActions={renderActions}
      />

      <CustomModal
        title="Crear Producto"
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateProduct}
        renderBody={productFormComponent}
      />

      <CustomModal
        title="Editar Producto"
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditProduct}
        renderBody={productFormComponent}
      />

      <CustomModal
        title={`Eliminar ${selectedElement}`}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSave={() => {
          if (selectedId) handleDeleteProduct(selectedId);
        }}
        renderBody={<p>¿Estás seguro de eliminar este producto?</p>}
      />
    </section>
  );
};

export default ProductList;
