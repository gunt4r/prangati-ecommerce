import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/react";
import { motion } from "framer-motion";
import { BiUser } from "react-icons/bi";
import classNames from "classnames";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  IoMdNotificationsOutline,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";

import style from "./styleDropdownUser.module.css";
export default function DropdownUser() {
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
    <Dropdown
      showArrow
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
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem
            key="profile"
            isReadOnly
            className="h-14 gap-2 opacity-100"
          >
            <User
              avatarProps={{
                size: "sm",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              description="aniston2@gmail.com"
              name="Junior Garcia"
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="dashboard"
            startContent={<FaRegCircleUser className={iconClasses} />}
          >
            View Profile
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<SlSettings className={iconClasses} />}
          >
            Account Settings
          </DropdownItem>
          <DropdownItem
            key="new_project"
            startContent={<IoMdNotificationsOutline className={iconClasses} />}
          >
            Notifications
          </DropdownItem>
          <DropdownItem
            key="help_and_feedback"
            startContent={<IoIosHelpCircleOutline className={iconClasses} />}
          >
            Help Center
          </DropdownItem>
          <DropdownItem
            key="logout"
            startContent={
              <CiLogout className={classNames(iconClasses, "rotate-180")} />
            }
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
