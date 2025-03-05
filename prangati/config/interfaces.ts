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

export interface Category {
  id: string;
  name: string;
}

export interface ApiResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
