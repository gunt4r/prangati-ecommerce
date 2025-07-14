import { useProductsStore } from "@/store/useProductsStore";
export default function useIsProductInWishlist(productId: string): Boolean {
  const wishlistProducts = useProductsStore((state) => state.wishlistProducts);
  const wishlistIds = new Set(wishlistProducts.map((item) => item.id));

  if (wishlistIds.has(productId)) {
    return true;
  }

  return false;
}
