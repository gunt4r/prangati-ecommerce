export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  rating?: number;
  isFeatured?: boolean;
  gender?: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
  };
  colors?: Array<{
    id: string;
    name: string;
    hexCode: string;
  }>;
  sizes?: Array<{
    id: string;
    size: string;
  }>;
  images: Array<{
    id: string;
    path: string;
    originalName: string;
  }>;
}

export interface ProductDetailed {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { path: string }[];
  stock?: number;
  colors?: {
    id: string;
    name: string;
    hexCode: string;
  }[];
  sizes?: {
    id: string;
    size: string;
  }[];
  isFeatured?: boolean;
  rating?: number;
  hasAttributes?: boolean;
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

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: Array<[string, string]>;
    searchBy: string[];
    search: string;
    filter: Record<string, any>;
  };
  links: {
    first: string;
    previous: string;
    current: string;
    next: string;
    last: string;
  };
  priceRange?: PriceRange;
}

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}
export interface ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  "filter.category.id"?: string;
  "filter.colors.id"?: string;
  "filter.sizes.id"?: string;
  "filter.price"?: string;
  "filter.rating"?: string;
  "filter.isFeatured"?: boolean;
  "filter.gender"?: string;
}

export interface AdvancedFilters {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  colorIds?: string[];
  sizeIds?: string[];
  categoryIds?: string[];
  inStock?: boolean;
  featured?: boolean;
  minRating?: number;
  search?: string;
  sortBy?: string;
}
