import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { motion } from "framer-motion";
import { BiUser } from "react-icons/bi";
import classNames from "classnames";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure } from "@heroui/modal";

import style from "./styleDropdownUser.module.css";

import AccountSettings from "@/components/AccountSettings/accountSettings";
import { poppins } from "@/config/fonts";
export default function DropdownUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER + "auth/check",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = () => {
    router.push("/logIn");
  };
  const handleSignIn = () => {
    router.push("/signIn");
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_uuid");
    checkAuth();
  };
  const motionUserIcon = {
    hover: {
      scale: 1.3,
      color: "#55630F",
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn",
      },
    },
  };

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div>
      {isAuthenticated ? (
        <Dropdown
          classNames={{
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-[#FEFEFE]",
          }}
          radius="sm"
        >
          <DropdownTrigger>
            <motion.div
              className={classNames(style["section-nav__helpers-icon"])}
              style={{ color: "#000" }}
              variants={motionUserIcon}
              whileHover="hover"
            >
              {" "}
              <BiUser className="text-2xl" style={{ color: "inherit" }} />
            </motion.div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            className="p-3"
            disabledKeys={["profile"]}
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection
              showDivider
              aria-label="Profile & Actions"
              classNames={{
                base: ` w-5/6   ${poppins.className}  `,
                divider: "mt-2",
              }}
            >
              <DropdownItem
                key="profile"
                isReadOnly
                className="h-10 gap-2 opacity-100"
                classNames={{
                  base: "w-full",
                }}
              >
                <section>
                  <p className="text-default-900 text-[10px] font-light">
                    Aniston Harper
                  </p>
                  <p className="text-default-500 text-[8px]">
                    aniston2@gmail.com{" "}
                  </p>
                </section>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                key="settings"
                startContent={<SlSettings className={iconClasses} />}
                onPress={onOpen}
              >
                Account Settings
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                startContent={
                  <IoIosHelpCircleOutline className={iconClasses} />
                }
              >
                Help Center
              </DropdownItem>
              <DropdownItem
                key="logout"
                startContent={
                  <CiLogout className={classNames(iconClasses, "rotate-180")} />
                }
                onPress={handleLogOut}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown
          classNames={{
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          }}
          radius="sm"
        >
          <DropdownTrigger>
            <motion.div
              className={classNames(style["section-nav__helpers-icon"])}
              style={{ color: "#000" }}
              variants={motionUserIcon}
              whileHover="hover"
            >
              {" "}
              <BiUser className="text-2xl" style={{ color: "inherit" }} />
            </motion.div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            className="p-3"
            disabledKeys={["profile"]}
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection>
              <DropdownItem
                key="dashboardLogin"
                startContent={<FaRegCircleUser className={iconClasses} />}
                onPress={handleLogin}
              >
                <p>Log in</p>
              </DropdownItem>
              <DropdownItem
                key="dashboardSignIn"
                startContent={<FaRegCircleUser className={iconClasses} />}
                onPress={handleSignIn}
              >
                <p>Sign in</p>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      )}
      <AccountSettings isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
