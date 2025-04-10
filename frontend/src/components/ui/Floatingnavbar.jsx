"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconLogin,
  IconUserPlus,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    // Uncomment the below if you want Dashboard to appear post-login dynamically
    // {
    //   name: "Dashboard",
    //   link: "/dashboard",
    //   icon: (
    //     <IconLayoutDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />
    //   ),
    // },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
