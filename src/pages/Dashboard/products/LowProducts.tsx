import { useEffect, useState } from "react";
import { IProduct } from "../../../interfaces/Product";
import { getLowProducts } from "../../../services/productService";
import ProductCard from "../../../components/products/Card/ProductCard";

const LowProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getLowProducts(setProducts);
  }, []);

  return products.length > 0 ? (
    <section className="rounded-2xl mb-4">
      <h2 className="text-2xl font-bold my-2">
        Productos con pocas existencias
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 overflow-x-auto p-4">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  ) : null;
};

export default LowProducts;
