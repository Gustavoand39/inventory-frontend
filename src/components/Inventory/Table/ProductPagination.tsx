import { Pagination } from "@nextui-org/react";

interface IProductPagination {
  page: number;
  total: number;
  callback: (page: number) => void;
}

const ProductPagination: React.FC<IProductPagination> = ({
  page,
  total,
  callback,
}) => {
  return (
    <div className="flex justify-center items-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={total}
        onChange={callback}
      />
    </div>
  );
};

export default ProductPagination;
