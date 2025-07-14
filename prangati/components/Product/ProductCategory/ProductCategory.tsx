import "./styleProductCategory.scss";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

import { archivo } from "@/config/fonts";
import { Category } from "@/types/categories";
export default function ProductCategory({
  style,
  category,
  productsName,
}: {
  style?: { [key: string]: string };
  category: Category;
  productsName: string;
}) {
  const router = useRouter();
  const handleClickProducts = () => {
    router.push("/products");
  };
  const handleClickCategory = () => {
    router.replace(`/products?category=${category.id}`);
  };

  return (
    <pre className="section-product__category__content" style={{ ...style }}>
      <Button
        className={`section-product__category__content--products`}
        variant="light"
        onPress={handleClickProducts}
      >
        <p
          className={`${archivo.className} section-product__category__content--products__content`}
        >
          {productsName}
        </p>
      </Button>{" "}
      /{" "}
      <Button
        className={`${archivo.className} section-product__category__content--category`}
        variant="light"
        onPress={handleClickCategory}
      >
        {category.name}
      </Button>
    </pre>
  );
}
