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
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import ClientPreloader from "../ClientPreloader/ClientPreloader";

import style from "./styleAccountSettings.module.css";

import { poppins } from "@/config/fonts";
import { useUUID } from "@/Hooks/useUUID";

interface User {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  city: string;
  address: string;
  country: string;
  postalCode: string;
}

interface AccountSettingsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AccountSettings({
  isOpen,
  onOpenChange,
}: AccountSettingsProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = useUUID();

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) {
        setLoading(false);

        return;
      }
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_SERVER}user/${userId}`);
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result: User = await response.json();

        setUserData(result);
      } catch (error) {
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [userId]);

  async function handleClick() {
    if (!userData) return;
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER}user/${userId}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        toast.error("Failed to update user data");
        throw new Error("Failed to update user data");
      }
      toast.success("User data updated successfully");
    } catch (error) {
      toast.error("Error updating user data");
    }
  }

  if (loading) return <ClientPreloader />;
  if (!userData) return null;

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onOpenChange}
    >
      <Toaster position="bottom-right" />
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader className="flex items-center flex-row justify-center gap-1">
              <p
                className={classNames(
                  style["section-account__form-modal-title"],
                  "mx-auto",
                  poppins.className,
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
                  value={userData.firstName}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
                <Input
                  label="LAST NAME"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  value={userData.lastName}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Input
                  label="PHONE NUMBER"
                  labelPlacement="outside"
                  radius="none"
                  type="tel"
                  value={String(userData.phone)}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, phone: Number(e.target.value) })
                  }
                />
                <Input
                  label="EMAIL"
                  labelPlacement="outside"
                  radius="none"
                  type="email"
                  value={userData.email}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Input
                  label="CITY"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  value={userData.city}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, city: e.target.value })
                  }
                />
                <Input
                  label="ADDRESS"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  value={userData.address}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-36">
                <Input
                  label="COUNTRY"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  value={userData.country}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, country: e.target.value })
                  }
                />
                <Input
                  label="POSTCODE"
                  labelPlacement="outside"
                  radius="none"
                  type="text"
                  value={userData.postalCode}
                  variant="bordered"
                  onChange={(e) =>
                    setUserData({ ...userData, postalCode: e.target.value })
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex w-5/6 items-center flex-row m-auto mb-6 mt-6">
              <Button
                className="bg-backgroundColorButtonBlack text-white ml-auto"
                radius="sm"
                size="lg"
                onPress={handleClick}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
