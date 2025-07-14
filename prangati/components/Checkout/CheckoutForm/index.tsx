"use client";
import "./styleCheckoutForm.scss";
import {
  Checkbox,
  Form,
  Input,
  Select,
  SelectItem,
  SharedSelection,
} from "@heroui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import CheckoutFormTitle from "./CheckoutFormTitle";

import { usePostOrder } from "@/api/checkout/useCheckout";
import { poppins } from "@/config/fonts";
import ButtonDark from "@/components/Cart/CartInfo/ButtonDark";
import { useUUID } from "@/hooks/useUUID";
import {
  useGetCountries,
  useGetCountryStates,
} from "@/api/countries/useCountries";
import Preloader from "@/components/ClientPreloader/Preloader";
import { CountryType, StateType } from "@/config/interfaces";
import { queryClient } from "@/api/react-query";
import {
  REACT_QUERY_CART_KEY,
  REACT_QUERY_COUNTRIES_KEY,
} from "@/config/const";
import { useGetUser } from "@/api/user/useUser";
export default function CheckoutForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [errors, setErrors] = useState({});
  const { mutate: postOrder } = usePostOrder();
  const { data: countries, isLoading } = useGetCountries();
  const { data: states, isLoading: isLoadingStates } =
    useGetCountryStates(selectedCountry);
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const [isSelectedNewsletter, setIsSelectedNewsletter] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();
  const userID = useUUID();
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      address: user?.address || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
      phone: user?.phone || "",
      country: user?.country || "",
      state: user?.state || "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        phone: user.phone || "",
        country: user.country || "",
        state: user.state || "",
      });
      setSelectedCountry(user.country || "");
      setSelectedState(user.state || "");
    }
  }, [isUserLoading, user, reset]);
  useEffect(() => {
    setValue("country", selectedCountry);
  }, [selectedCountry, setValue]);

  useEffect(() => {
    setValue("state", selectedState);
  }, [selectedState, setValue]);

  const onSubmit = (data: any) => {
    if (!data.country) {
      toast.error("Country is required");

      return;
    }
    setIsLoadingButton(true);
    postOrder(
      {
        address: {
          addressLine1: data.address,
          city: data.city,
          zip: data.postalCode,
          country: data.country,
          state: data.state || undefined,
        },
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        userId: userID,
        isSubscribingToNewsletter: isSelectedNewsletter,
      },
      {
        onSuccess: () => {
          toast.success("Order has been created");
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [REACT_QUERY_CART_KEY] });
            router.push("/");
          }, 1500);
        },
        onError: (error: any) => {
          setErrors(error?.response.data.errors);
          toast.error("Error creating order");
        },
        onSettled: () => {
          setIsLoadingButton(false);
        },
      }
    );
  };

  useEffect(() => {
    if (selectedCountry) {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_COUNTRIES_KEY] });
    }
  }, [selectedCountry]);
  if (isLoading || isUserLoading) {
    return <Preloader />;
  }

  return (
    <Form
      autoComplete="on"
      className="checkout-form w-full"
      validationErrors={errors}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CheckoutFormTitle title="Contact information" />
      <div className="flex gap-8 flex-row w-full items-center">
        <Input
          className=" hover:duration-1000"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="FIRST NAME"
          type="text"
          {...register("firstName")}
          variant="underlined"
        />{" "}
        <Input
          className=""
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="LAST NAME"
          {...register("lastName")}
          type="text"
          variant="underlined"
        />{" "}
      </div>
      <Input
        className="w-full mt-4"
        classNames={{
          inputWrapper: "border-default-500 hover:border-default-300",
        }}
        label="EMAIL"
        {...register("email")}
        type="email"
        variant="underlined"
      />
      <Checkbox
        className="w-10/12 mb-20"
        classNames={{
          wrapper: "mr-6",
        }}
        color="default"
        isSelected={isSelectedNewsletter}
        onValueChange={setIsSelectedNewsletter}
      >
        <p className={`text-sm checkout-form__checkbox ${poppins.className}`}>
          Sign up for our newsletters for promotions, news and coupons
        </p>
      </Checkbox>
      <CheckoutFormTitle title="shipping address" />
      <div className="flex gap-8 flex-row w-full items-center">
        <Input
          className=" hover:duration-1000"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="STREET"
          {...register("address")}
          type="text"
          variant="underlined"
        />{" "}
        <Input
          className=""
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="PHONE"
          {...register("phone")}
          type="tel"
          variant="underlined"
        />{" "}
      </div>
      <div className="flex gap-8 flex-row w-full items-center">
        <Input
          className=" hover:duration-1000"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="POSTCODE"
          {...register("postalCode")}
          type="text"
          variant="underlined"
        />{" "}
        <Input
          className=""
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="CITY"
          {...register("city")}
          type="tel"
          variant="underlined"
        />{" "}
      </div>
      <div className="flex gap-8 flex-row w-full items-center">
        <Select
          isRequired
          isVirtualized
          classNames={{
            mainWrapper: "border-default-500 hover:border-default-300",
            trigger: "border-default-500 hover:border-default-300",
          }}
          color="default"
          items={countries}
          label="Country"
          name="country"
          selectedKeys={new Set([watch("country")])}
          variant="underlined"
          onSelectionChange={(keys: SharedSelection) => {
            setSelectedCountry(keys.currentKey ?? "");
            setSelectedState("");
          }}
        >
          {(item: CountryType) => (
            <SelectItem key={item.value}>{item.name}</SelectItem>
          )}
        </Select>
        {selectedCountry && states && Array.isArray(states) && (
          <Select
            isRequired
            isVirtualized
            required
            classNames={{
              mainWrapper: "border-default-500 hover:border-default-300",
              trigger: "border-default-500 hover:border-default-300",
            }}
            color="default"
            isLoading={isLoadingStates}
            items={states}
            label="State / Region"
            name="state"
            selectedKeys={new Set([watch("state")])}
            variant="underlined"
            onSelectionChange={(keys: SharedSelection) => {
              setSelectedState(keys.currentKey ?? "");
            }}
          >
            {(item: StateType) => {
              return (
                <SelectItem key={item.key}>{item.name.default}</SelectItem>
              );
            }}
          </Select>
        )}
      </div>
      <ButtonDark
        classNames="w-8/12 mt-12"
        isLoading={isLoadingButton}
        size="lg"
        type="submit"
      />
    </Form>
  );
}
