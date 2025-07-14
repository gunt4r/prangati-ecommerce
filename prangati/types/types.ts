import { Gender } from "@/utils/enums/gender";

export type CustomDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export type FiltersFormValues = {
  gender: Gender[];
  sizeIds: string[];
  categoryIds: string[];
  colorIds: string[];
  minPrice: number;
  maxPrice: number;
};

export type ProductNakedType = {
  id: string;
  name: string;
  description: string;
  price: number;
  gender: Gender;
  stock: number;
  rating: number;
  isFeatured: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  cardType: string;
};
