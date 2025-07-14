import { useProductsStore } from "@/store/useProductsStore";
export function IsProductInCart(productID: string) {
  const cartProducts = useProductsStore((state) => state.cartProducts);
  const cartIds = new Set(cartProducts.map((item) => item.product.id));

  if (cartIds.has(productID)) {
    return true;
  }

  return false;
}
