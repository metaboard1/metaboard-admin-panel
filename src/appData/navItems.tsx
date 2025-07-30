import {  BookText, LayoutDashboard, Newspaper, User2 } from "lucide-react";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: <LayoutDashboard />,
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: <Newspaper />,
        name: "Articles",
        path: "/articles",
    },
    {
        icon: <BookText />,
        name: "Publications",
        path: "/publications",
    },
    {
        icon: <User2 />,
        name: "Users",
        path: "/users",
    },
];
export default navItems;