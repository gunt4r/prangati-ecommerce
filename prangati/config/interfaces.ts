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
  hasAttributes?: boolean;
}

export interface ProductCart extends Product {
  category: {
    name: string;
  };
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

export interface CartResponse {
  data: {
    items: any[];
  };
}
export interface CountryType {
  value: string;
  name: string;
}
export interface StateType {
  key: string;
  name: {
    default: string;
  };
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
  state: string;
  phone: string;
}
export interface UserAddress {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  postalCode: string;
  addressLine1: string;
  country: string;
  state: string;
  phone: string;
}
