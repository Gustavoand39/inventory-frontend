import { Pagination } from "@nextui-org/react";

interface CustomTableFooter {
  page: number;
  total: number;
  callback: (page: number) => void;
}

const CustomTableFooter: React.FC<CustomTableFooter> = ({
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

export default CustomTableFooter;
