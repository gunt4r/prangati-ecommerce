import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import "./styleDrawer.scss";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";

import { useProductsStore } from "@/store/useProductsStore";
import { Gender } from "@/utils/enums/gender";
import { poppins } from "@/config/fonts";
import { useSizes } from "@/api/sizes/useSizes";
import Preloader from "@/components/ClientPreloader/Preloader";

import { Slider } from "@heroui/react";
type CustomDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};
export default function DrawerCustom({
  isOpen,
  onOpenChange,
}: CustomDrawerProps) {
  const filterParams = useProductsStore((state) => state.filterParams);
  const setFilterParams = useProductsStore((state) => state.setFilterParams);

  const priceRange = useProductsStore((state) => state.priceRange);
  const setPriceRange = useProductsStore((state) => state.setPriceRange);
  const { data: sizes, isLoading, isError } = useSizes();

  if (isLoading) {
    return <Preloader />;
  }
  if (isError) {
    return toast.error("Failed to load sizes");
  }

  return (
    <>
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.3,
              },
            },
            exit: {
              x: -100,
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            },
          },
        }}
        placement="left"
        radius="none"
        size="md"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="d-flex justify-between mt-4 items-center">
                <p className={`drawer-title ${poppins.className}`}>
                  Product Filters
                </p>
                <Button
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={onClose}
                >
                  <CgClose />
                </Button>
              </DrawerHeader>
              <DrawerBody>
                <Accordion>
                  <AccordionItem
                    className="d-flex justify-between items-center"
                    classNames={{
                      content: "drawer-body__content",
                    }}
                    title="Gender"
                  >
                    {Object.values(Gender).map((gender) => (
                      <Button
                        key={gender}
                        className="capitalize border"
                        startContent={
                          filterParams.gender?.includes(gender) ? (
                            <CheckIcon className="ml-1" />
                          ) : null
                        }
                        variant={
                          filterParams.gender?.includes(gender)
                            ? "shadow"
                            : "ghost"
                        }
                        onPress={() => setFilterParams({ gender: gender })}
                      >
                        {gender}
                      </Button>
                    ))}
                  </AccordionItem>
                  <AccordionItem
                    className="d-flex justify-between items-center"
                    classNames={{
                      content: "drawer-body__content",
                    }}
                    title="Size"
                  >
                    {sizes.map((size: any) => (
                      <Button
                        key={size.id}
                        className="capitalize border"
                        startContent={
                          filterParams.sizeIds?.includes(size.size) ? (
                            <CheckIcon className="ml-1" />
                          ) : null
                        }
                        variant={
                          filterParams.sizeIds?.includes(size.id)
                            ? "shadow"
                            : "ghost"
                        }
                        onPress={() => setFilterParams({ sizeIds: size.id })}
                      >
                        {size.size}
                      </Button>
                    ))}
                  </AccordionItem>
                  <AccordionItem
                    className="d-flex justify-between items-center"
                    classNames={{
                      content: "drawer-body__content",
                    }}
                    title="Price"
                  >
                    <Slider
                      className="max-w-md"
                      defaultValue={[0, priceRange?.max || 1000]}
                      formatOptions={{ style: "currency", currency: "USD" }}
                      label="Price Range"
                      maxValue={priceRange?.max || 1000}
                      minValue={priceRange?.min || 0}
                      step={1}
                      onChange={(value: number[] | number) => {
                        if (!Array.isArray(value)) {
                          return;
                        }
                        if (setPriceRange) {
                          setPriceRange({ minPrice: value[0], maxPrice: value[1] });
                        }
                      }}
                    />
                  </AccordionItem>
                </Accordion>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
export const CheckIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};
