import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import classNames from "classnames";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { Form, SharedSelection } from "@heroui/react";
import { isEqual } from "lodash";
import { Select, SelectItem } from "@heroui/react";

import Preloader from "../ClientPreloader/Preloader";

import style from "./styleAccountSettings.module.css";

import { archivo } from "@/config/fonts";
import { useUUID } from "@/hooks/useUUID";
import { useGetUser } from "@/api/user/useUser";
import { useUpdateUser } from "@/api/user/useUser";
import { queryClient } from "@/api/react-query";
import {
  REACT_QUERY_COUNTRIES_KEY,
  REACT_QUERY_USER_KEY,
} from "@/config/const";
import { useGetCountries } from "@/api/countries/useCountries";
import { CountryType } from "@/config/interfaces";
interface AccountSettingsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AccountSettings({
  isOpen,
  onOpenChange,
}: AccountSettingsProps) {
  const { data: user, isLoading } = useGetUser();
  const userId = useUUID();
  const { mutate } = useUpdateUser();
  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const { data: countries, isLoading: isLoadingCountries } = useGetCountries();
  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    phone: user?.phone || "",
    country: user?.country || "",
  };

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });
  const defaultRef = useRef(defaultValues);

  useEffect(() => {
    if (!isLoading && user) {
      const newDefaults = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        phone: user.phone || "",
        country: user.country || "",
      };

      reset(newDefaults);
      defaultRef.current = newDefaults;
      setSelectedCountry(user.country || "");
    }
  }, [isLoading, user, reset]);
  useEffect(() => {
    setValue("country", selectedCountry);
  }, [selectedCountry, setValue]);

  async function handleClick(data: any) {
    if (!data) return;
    if (!userId) return;
    if (isEqual(data, defaultRef.current))
      return toast.error("No changes made");
    if (!data.country) {
      toast.error("Country is required");

      return;
    }

    try {
      const flatData = {
        address: {
          addressLine1: data.address,
          city: data.city,
          zip: data.postalCode,
          country: selectedCountry ?? data.country,
          state: data.state || undefined,
        },
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        userId: userId,
      };

      mutate(flatData, {
        onSuccess: () => {
          toast.success("User has been updated");
          queryClient.invalidateQueries({ queryKey: [REACT_QUERY_USER_KEY] });
          onOpenChange(false);
          setErrors({});
        },

        onError: (error: any) => {
          setErrors(error?.response?.data?.errors ?? {});
          toast.error("Error updating user data");
        },
      });
    } catch (error) {
      toast.error("Error updating user data");
    }
  }

  useEffect(() => {
    if (selectedCountry) {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_COUNTRIES_KEY] });
    }
  }, [selectedCountry]);
  if (isLoading || isLoadingCountries) return <Preloader />;

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(_onClose: () => void) => (
          <Form
            autoComplete="on"
            className="checkout-form w-full"
            validationErrors={errors}
            onSubmit={handleSubmit(handleClick)}
          >
            <ModalHeader className="flex items-center flex-row mx-auto justify-center gap-1">
              <p
                className={classNames(
                  style["section-account__form-modal-title"],
                  archivo.className
                )}
              >
                Account settings
              </p>
            </ModalHeader>
            <ModalBody className="w-5/6 m-auto flex flex-col gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Input
                  label="FIRST NAME"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  {...register("firstName")}
                  variant="bordered"
                />
                <Input
                  label="LAST NAME"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  variant="bordered"
                  {...register("lastName")}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Input
                  label="PHONE NUMBER"
                  labelPlacement="outside"
                  radius="none"
                  type="tel"
                  variant="bordered"
                  {...register("phone")}
                />
                <Input
                  label="EMAIL"
                  labelPlacement="outside"
                  radius="none"
                  type="email"
                  variant="bordered"
                  {...register("email")}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Input
                  label="CITY"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  variant="bordered"
                  {...register("city")}
                />
                <Input
                  label="ADDRESS"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  variant="bordered"
                  {...register("address")}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Select
                  items={countries}
                  label="COUNTRY"
                  labelPlacement="outside"
                  name="country"
                  radius="none"
                  selectedKeys={new Set([selectedCountry])}
                  variant="bordered"
                  onSelectionChange={(keys: SharedSelection) => {
                    setSelectedCountry(keys.currentKey ?? "");
                  }}
                >
                  {(item: CountryType) => (
                    <SelectItem key={item.value}>{item.name}</SelectItem>
                  )}
                </Select>
                <Input
                  label="POSTCODE"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  variant="bordered"
                  {...register("postalCode")}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex w-5/6 items-center flex-row m-auto mb-6 mt-6">
              <Button
                className="bg-backgroundColorButtonBlack text-white ml-auto uppercase"
                radius="sm"
                size="lg"
                type="submit"
              >
                Update
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}
