import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import { useProductsStore } from "@/store/useProductsStore";
import { queryClient } from "@/api/react-query";
export default function SortingDropdown() {
  const sortParams = useProductsStore((state) => state.sortParams);
  const setSortParams = useProductsStore((state) => state.setSortParams);
  const onAction = (e: React.Key) => {
    queryClient.invalidateQueries({ queryKey: ["products-advanced"] });
    setSortParams({ sortBy: e.toString() });
  };

  return (
    <Dropdown
      className="border border-backgroundColorButtonBlack"
      radius="none"
    >
      <DropdownTrigger>
        <Button
          className="bg-transparent border-backgroundColorButtonBlack border px-8 py-3 h-auto"
          radius="none"
          variant="bordered"
        >
          Sort By
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        defaultSelectedKeys={["createdAt:DESC"]}
        selectedKeys={[sortParams.sortBy || "createdAt:DESC"]}
        selectionMode="single"
        onAction={onAction}
      >
        <DropdownItem key="stock:DESC">Top Sellers</DropdownItem>
        <DropdownItem key="createdAt:DESC">New Arrivals</DropdownItem>
        <DropdownItem key="price:ASC">Price Low to High</DropdownItem>
        <DropdownItem key="price:DESC">Price High to Low</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
