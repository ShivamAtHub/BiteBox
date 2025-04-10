import React from "react";
import { SidebarDemo } from "./Sidenavbar";
import { FloatingNavDemo } from "./Floatingnavbar";

export default function Navbar({ variant = "navbar" }) {
    if (variant === "sidebar") {
        return < SidebarDemo />;
    }

    return <FloatingNavDemo />
}
