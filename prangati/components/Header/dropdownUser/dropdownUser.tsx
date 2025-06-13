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
import { BiUserCircle } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@heroui/modal";
import { PiUserCirclePlusBold } from "react-icons/pi";

import style from "./styleDropdownUser.module.css";

import AccountSettings from "@/components/AccountSettings/accountSettings";
import { poppins } from "@/config/fonts";
import { useGetAuth } from "@/api/auth/useAuth";
import Preloader from "@/components/ClientPreloader/Preloader";
import { queryClient } from "@/api/react-query";
import { REACT_QUERY_AUTH_KEY } from "@/config/const";
import { useGetUser } from "@/api/user/useUser";
export default function DropdownUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { data, isLoading } = useGetAuth();
  const isAuthenticated = Boolean(data && data.status === 200);
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const handleLogin = () => {
    router.push("/logIn");
  };
  const handleSignIn = () => {
    router.push("/signIn");
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_uuid");
    queryClient.invalidateQueries({ queryKey: [REACT_QUERY_AUTH_KEY] });
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

  if (isLoading || isLoadingUser) return <Preloader />;

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
                  <p className="text-default-900 text-[14px] font-light">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-default-500 text-[10px]">{user?.email}</p>
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
                startContent={<BiUserCircle className={iconClasses} />}
                onPress={handleLogin}
              >
                <p>Log in</p>
              </DropdownItem>
              <DropdownItem
                key="dashboardSignIn"
                startContent={
                  <PiUserCirclePlusBold
                    className={`${iconClasses} -m-0.5 w-6 text-2xl`}
                  />
                }
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
