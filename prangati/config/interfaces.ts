export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  stock?: number;
  colors?: { color: string }[];
  sizes?: { size: string }[];
  isFeatured?: boolean;
  rating?: number;
}

export interface ProductCart extends Product {
  quantity: number;
}
