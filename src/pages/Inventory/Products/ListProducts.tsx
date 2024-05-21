import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import ProductForm from "../../../components/Inventory/Modal/ProductForm";
import ProductHeader from "../../../components/Inventory/Table/ProductTableHeader";
import CustomModal from "../../../components/ui/Modal/CustomModal";
import CustomTable from "../../../components/ui/Tables/CustomTable";

import {
  initialProductColumns,
  initialProductState,
} from "../../../constants/initialStateProducts";
import { getProducts, createProduct } from "../../../services/products";
import useForm from "../../../hooks/useForm";
import useModal from "../../../hooks/useModal";
import { IProduct } from "../../../interfaces/Product";
import { IColumn } from "../../../interfaces/Table";
import handleAxiosError from "../../../helpers/handleAxiosError";
import { toast } from "sonner";

const ProductList = () => {
  const [image, setImage] = useState<File | null>(null);
  // const [selectedId, setSelectedId] = useState<number | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<IColumn[]>(initialProductColumns);

  const { values, handleInputChange, reset } = useForm(initialProductState);

  const {
    isOpen: isCreateModalOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

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

  const getAllProducts = async () => {
    try {
      const { products } = await getProducts();
      if (products) setProducts(products);
    } catch (error) {
      const resp = handleAxiosError(error);
      toast.error(resp.message);
    }
  };

  // * CREAR PRODUCTO
  const openCreateProductModal = () => {
    openCreateModal();
    setImage(null);
  };

  const handleCreateProduct = async () => {
    try {
      closeCreateModal();
      await createProduct(values, image);
      console.log("values: ", values);
      const { products } = await getProducts();
      if (products) setProducts(products);
      reset(initialProductState);
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
        // onPress={() => openEditProductModal(product.id)}
        onPress={() => console.log("Editar: ", product.id)}
      >
        <PencilIcon height={18} />
      </Button>

      <Button
        isIconOnly
        size="sm"
        color="danger"
        variant="flat"
        // onPress={() => openDeleteProductModal(product.id)}
        onPress={() => console.log("Borrar: ", product.id)}
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
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
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
    </section>
  );
};

export default ProductList;
