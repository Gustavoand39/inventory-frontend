import { InventoryState } from "../../interfaces/Inventory";

const RenderState = (state: InventoryState) => (
  <div className="p-4 bg-gray-100 rounded-md mb-4">
    <p>
      <strong>ID:</strong> {state.id}
    </p>
    <p>
      <strong>Nombre:</strong> {state.name}
    </p>
    <p>
      <strong>Descripción:</strong> {state.description}
    </p>
    <p>
      <strong>Stock:</strong> {state.stock}
    </p>
    <p>
      <strong>Stock Mínimo:</strong> {state.minStock}
    </p>
    <p>
      <strong>Categoría ID:</strong> {state.categoryId}
    </p>
    <p>
      <strong>Creado:</strong> {new Date(state.createdAt).toLocaleString()}
    </p>
    <p>
      <strong>Actualizado:</strong> {new Date(state.updatedAt).toLocaleString()}
    </p>
  </div>
);

export default RenderState;
