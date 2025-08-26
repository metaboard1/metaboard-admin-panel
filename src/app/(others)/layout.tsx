"use client";

import React from "react";
import { AppHeader, AppSidebar } from "@/components/global";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { checkAuthorization } from "@/hoc";

const CommonLayout = ({ children }: any) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";
    return (

        <div className="min-h-screen xl:flex">
            <AppSidebar />
            {/* <Backdrop /> */}
            <div
                className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
            >
                <AppHeader />
                <div className="p-4 mx-auto md:p-6">{children}</div>
            </div>
        </div>
    )
}
const Layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <ThemeProvider>
            <SidebarProvider>
                {/* {children} */}
                <CommonLayout children={children} />
            </SidebarProvider>
        </ThemeProvider>

    );
}
export default checkAuthorization(Layout);