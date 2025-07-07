import { useDisclosure } from "@heroui/react";
import { VscSettings } from "react-icons/vsc";
import { Button } from "@heroui/react";

import SortingDropdown from "./Dropdown";
import DrawerCustom from "./Drawer";
import "./styleFilters.scss";
export default function Filters() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="filters-sorting">
      <span>
        <Button
          className="bg-transparent border-backgroundColorButtonBlack border px-8 py-2"
          endContent={<VscSettings size={20} />}
          radius="none"
          size="lg"
          onPress={onOpen}
        >
          Filters
        </Button>
        <DrawerCustom isOpen={isOpen} onOpenChange={onOpenChange} />
      </span>
      <SortingDropdown />
    </section>
  );
}
