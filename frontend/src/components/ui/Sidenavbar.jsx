import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconHistory,
  IconUser,
  IconMenu2,
  IconMapPin,
  IconShoppingCart,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function SidebarDemo() {
  const toplinks = [
    {
      label: "Browser Menu",
      href: "/menu",
      icon: (
        <IconMenu2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Cart",
      href: "/cart",
      icon: (
        <IconShoppingCart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Track Order",
      href: "/order-tracking",
      icon: (
        <IconMapPin className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Order History",
      href: "/customer-orders",
      icon: (
        <IconHistory className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const logoutLink = {
    label: "Logout",
    href: "/",
    icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  };

  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {toplinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
        <SidebarLink link={logoutLink} />
        <hr className="my-2 border-neutral-300 dark:border-neutral-700" />
          <SidebarLink
            link={{
              label: "Demo User 1",
              href: "#",
              icon: (
                <IconUser className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
              ),
            }} />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/bitebox.png"
        alt="Logo"
        className="h-6 w-6 object-contain"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Welcome, User!
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <img
        src="/bitebox.png"
        alt="Logo"
        className="h-6 w-6 object-contain"
      />
    </Link>
  );
};