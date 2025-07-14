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
import { Slider } from "@heroui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { CheckIcon } from "@/utils/icons/checkIcon";
import { useProductsStore } from "@/store/useProductsStore";
import { Gender } from "@/utils/enums/gender";
import { poppins } from "@/config/fonts";
import { useSizes } from "@/api/sizes/useSizes";
import { useCategories } from "@/api/categories/useCategories";
import { useColors } from "@/api/colors/useColors";
import ProductColors from "@/components/Product/ProductInfo/ProductColors";
import { CustomDrawerProps, FiltersFormValues } from "@/types/types";
import ButtonDark from "@/components/Cart/CartInfo/ButtonDark";
import { COOKIE_PRODUCT_KEY } from "@/config/const";
export default function DrawerCustom({
  isOpen,
  onOpenChange,
}: CustomDrawerProps) {
  const setFilterParams = useProductsStore((state) => state.setFilterParams);

  const priceRange = useProductsStore((state) => state.priceRange);
  const setPriceRange = useProductsStore((state) => state.setPriceRange);
  const [sliderValue, setSliderValue] = useState<number[]>([
    priceRange?.minPrice || 0,
    priceRange?.maxPrice || 1000,
  ]);
  const { data: sizes, isLoading } = useSizes();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: colors, isLoading: isLoadingColors } = useColors();
  const { setValue, handleSubmit, watch, getValues, reset } =
    useForm<FiltersFormValues>({
      defaultValues: {
        gender: [],
        sizeIds: [],
        categoryIds: [],
        colorIds: [],
        minPrice: priceRange?.minPrice ?? 0,
        maxPrice: priceRange?.maxPrice ?? 1000,
      },
    });

  useEffect(() => {
    const cookieData = Cookies.get(COOKIE_PRODUCT_KEY);

    if (cookieData) {
      const parsedData = JSON.parse(cookieData);

      reset(parsedData);
      setSliderValue([parsedData.minPrice || 0, parsedData.maxPrice || 1000]);
    }
  }, [reset]);

  const onSubmit = (data: any) => {
    const { minPrice, maxPrice, ...rest } = data;

    console.log("Filters submitted:", data);
    setFilterParams(rest);
    if (setPriceRange) {
      setPriceRange({
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    }
    Cookies.set(COOKIE_PRODUCT_KEY, JSON.stringify(data), {
      expires: 2 / 24,
    });
    toast.success("Filters applied successfully!");
    onOpenChange(false);
  };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Accordion>
                    <AccordionItem
                      className="d-flex justify-between items-center "
                      classNames={{
                        content:
                          "drawer-body__content drawer-body__content--grid",
                      }}
                      title="Gender"
                    >
                      {Object.values(Gender).map((gender) => {
                        const isSelected = watch("gender").includes(gender);

                        return (
                          <Button
                            key={gender}
                            className="capitalize border"
                            startContent={
                              isSelected ? (
                                <CheckIcon className="ml-1 min-w-3" />
                              ) : null
                            }
                            variant={isSelected ? "shadow" : "ghost"}
                            onPress={() => {
                              const previousGenders = getValues("gender") || [];
                              const newGenders = previousGenders.includes(
                                gender,
                              )
                                ? previousGenders.filter((g) => g !== gender)
                                : [...previousGenders, gender];

                              setValue("gender", newGenders);
                            }}
                          >
                            {gender}
                          </Button>
                        );
                      })}
                    </AccordionItem>
                    <AccordionItem
                      className="d-flex justify-between items-center"
                      classNames={{
                        content:
                          "drawer-body__content drawer-body__content--grid",
                      }}
                      title="Size"
                    >
                      {sizes.map((size: any) => {
                        const isSelected = watch("sizeIds").includes(size.id);

                        return (
                          <Button
                            key={size.id}
                            className="capitalize border"
                            startContent={
                              isSelected ? (
                                <CheckIcon className="ml-1 min-w-3" />
                              ) : null
                            }
                            variant={isSelected ? "shadow" : "ghost"}
                            onPress={() => {
                              const previousSizes = getValues("sizeIds") || [];
                              const newSizes = previousSizes.includes(size.id)
                                ? previousSizes.filter((g) => g !== size.id)
                                : [...previousSizes, size.id];

                              setValue("sizeIds", newSizes);
                            }}
                          >
                            {size.size}
                          </Button>
                        );
                      })}
                    </AccordionItem>
                    <AccordionItem
                      className="d-flex justify-between items-center"
                      classNames={{
                        content:
                          "drawer-body__content drawer-body__content--grid",
                      }}
                      title="Price"
                    >
                      <Slider
                        className="max-w-md"
                        color="foreground"
                        defaultValue={[
                          isNaN(priceRange?.minPrice ?? 0)
                            ? 0
                            : (priceRange?.minPrice ?? 0),
                          isNaN(priceRange?.maxPrice ?? 1000)
                            ? 1000
                            : (priceRange?.maxPrice ?? 1000),
                        ]}
                        formatOptions={{ style: "currency", currency: "USD" }}
                        label="Price Range"
                        maxValue={priceRange?.maxPrice ?? 1000}
                        minValue={priceRange?.minPrice ?? 0}
                        step={1}
                        value={sliderValue}
                        onChange={(value: number[] | number) => {
                          if (!Array.isArray(value)) {
                            return;
                          }
                          setSliderValue(value);
                        }}
                        onChangeEnd={(value: number[] | number) => {
                          if (!Array.isArray(value)) {
                            return;
                          }
                          if (setPriceRange) {
                            setValue("minPrice", value[0], {
                              shouldValidate: true,
                            });
                            setValue("maxPrice", value[1], {
                              shouldValidate: true,
                            });
                            setPriceRange({
                              minPrice: value[0],
                              maxPrice: value[1],
                            });
                          }
                        }}
                      />
                    </AccordionItem>
                    <AccordionItem
                      className="d-flex justify-between items-center"
                      classNames={{
                        content:
                          "drawer-body__content drawer-body__content--grid",
                      }}
                      title="Brand"
                    >
                      {categories?.map((category: any) => {
                        const isSelected = watch("categoryIds").includes(
                          category.id,
                        );

                        return (
                          <Button
                            key={category.id}
                            className="capitalize border"
                            startContent={
                              isSelected ? (
                                <CheckIcon className="ml-1 min-w-3" />
                              ) : null
                            }
                            variant={isSelected ? "shadow" : "ghost"}
                            onPress={() => {
                              const previousGenders =
                                getValues("categoryIds") || [];
                              const newCategories = previousGenders.includes(
                                category.id,
                              )
                                ? previousGenders.filter(
                                    (g) => g !== category.id,
                                  )
                                : [...previousGenders, category.id];

                              setValue("categoryIds", newCategories);
                            }}
                          >
                            {category.name}
                          </Button>
                        );
                      })}
                    </AccordionItem>
                    <AccordionItem
                      className="d-flex justify-between items-center"
                      classNames={{
                        content:
                          "drawer-body__content drawer-body__content--grid",
                      }}
                      title="Color"
                    >
                      {colors?.map((color: any) => {
                        const isSelected = watch("colorIds").includes(color.id);

                        return (
                          <ProductColors
                            key={color.id}
                            color={color}
                            handleClick={() => {
                              const previousColors =
                                getValues("colorIds") || [];
                              const newColors = previousColors.includes(
                                color.id,
                              )
                                ? previousColors.filter((g) => g !== color.id)
                                : [...previousColors, color.id];

                              setValue("colorIds", newColors);
                            }}
                            isSelected={isSelected}
                          />
                        );
                      })}
                    </AccordionItem>
                  </Accordion>
                  <ButtonDark
                    classNames="mt-8"
                    isLoading={
                      isLoading || isLoadingCategories || isLoadingColors
                    }
                    text="SHOW ALL"
                    type="submit"
                  />
                </form>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
