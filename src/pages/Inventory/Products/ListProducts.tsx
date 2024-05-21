import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

import ProductForm from "../../../components/Inventory/Modal/ProductForm";
import ProductHeader from "../../../components/Inventory/Table/ProductTableHeader";
import CustomModal from "../../../components/ui/Modal/CustomModal";
import CustomTable from "../../../components/ui/Tables/CustomTable";

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
import { getImage } from "../../../services/uploadFiles";

const ProductList = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<IColumn[]>(initialProductColumns);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { values, handleInputChange, setFormValue, reset } =
    useForm(initialProductState);

  useEffect(() => {
    getAllProducts();
  }, []);

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
      const { products } = await getProducts();
      if (products) setProducts(products);
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  //* CREAR PRODUCTO
  const openCreateProductModal = () => {
    setIsCreateOpen(true);
    setImage(null);
  };

  const handleCreateProduct = async () => {
    try {
      setIsCreateOpen(false);
      const resp = await createProduct(values, image);
      if (!resp.error) {
        toast.success(resp.message);
        const { products } = await getProducts();
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
    try {
      const resp = await getProduct(id);
      if (!resp.error && resp.product) {
        const image = await getImage(resp.product.image);
        console.log(":0 -> ", image);
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
      await updateProduct(values, image);
      const { products } = await getProducts();
      if (products) setProducts(products);
      reset(initialProductState);
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  //* ELIMINAR PRODUCTO
  const openDeleteProductModal = (id: number) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      setIsDeleteOpen(false);
      await deleteProduct(id);
      const { error } = await getProducts();
      if (!error) {
        setProducts(products.filter((product) => product.id !== id));
        setSelectedId(null);
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
          if (product.id) openDeleteProductModal(product.id);
        }}
      >
        <TrashIcon height={18} />
      </Button>
    </div>
  );

  return (
    <section>
      <CustomTable
        aria="Lista de productos"
        data={products}
        columns={columns}
        topContent={
          <ProductHeader
            columns={columns}
            length={products.length}
            toggleColumnVisibility={toggleColumnVisibility}
            openCreateModal={openCreateProductModal}
          />
        }
        renderActions={renderActions}
      />

      <CustomModal
        title="Crear Producto"
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateProduct}
        renderBody={
          <ProductForm
            values={values}
            handleInputChange={handleInputChange}
            image={image}
            setImage={setImage}
          />
        }
      />

      <CustomModal
        title="Editar Producto"
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditProduct}
        renderBody={
          <ProductForm
            values={values}
            handleInputChange={handleInputChange}
            image={image}
            setImage={setImage}
          />
        }
      />

      <CustomModal
        title="Eliminar Producto"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSave={() => {
          if (selectedId) handleDeleteProduct(selectedId);
        }}
        renderBody={
          <div>
            <p>¿Estás seguro de eliminar este producto?</p>
          </div>
        }
      />
    </section>
  );
};

export default ProductList;
