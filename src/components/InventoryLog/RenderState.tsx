import { InventoryState } from "../../interfaces/InventoryLog";

const RenderState: React.FC<InventoryState> = (state): JSX.Element => (
  <div className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-md mb-4">
    <p>
      <strong className="dark:text-gray-300">ID:</strong> {state.id}
    </p>
    <p>
      <strong className="dark:text-gray-300">Nombre:</strong> {state.name}
    </p>
    <p>
      <strong className="dark:text-gray-300">Descripción:</strong>{" "}
      {state.description}
    </p>
    <p>
      <strong className="dark:text-gray-300">Stock:</strong> {state.stock}
    </p>
    <p>
      <strong className="dark:text-gray-300">Stock Mínimo:</strong>{" "}
      {state.minStock}
    </p>
    <p>
      <strong className="dark:text-gray-300">Categoría ID:</strong>{" "}
      {state.categoryId}
    </p>
    <p>
      <strong className="dark:text-gray-300">Creado:</strong>{" "}
      {new Date(state.createdAt).toLocaleString()}
    </p>
    <p>
      <strong className="dark:text-gray-300">Actualizado:</strong>{" "}
      {new Date(state.updatedAt).toLocaleString()}
    </p>
  </div>
);

export default RenderState;
