export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { path: string }[];
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
export interface Image {
  path: string;
  entityTipe: string;
}
export interface Handlers {
  setThumbIndex: (index: number) => void;
}
