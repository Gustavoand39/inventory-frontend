import { Pagination } from "@nextui-org/react";

interface CustomTableFooter {
  page: number;
  total: number;
  callback?: (page: number) => void;
}

/**
 * Componente personalizado para el pie de la tabla
 *
 * @param {CustomTableFooter} props Propiedades del componente
 * @param {number} props.page Página actual
 * @param {number} props.total Total de registros
 * @param {(page: number) => void} [props.callback] Función para cambiar la página (setPage)
 * @returns {JSX.Element} Elemento JSX
 */
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
