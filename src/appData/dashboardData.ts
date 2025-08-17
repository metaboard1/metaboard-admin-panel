import { BookOpen, File, FileText } from "lucide-react";

const statsCardData = [
    {
        dataKey: 'article',
        title: "Total Articles",
        icon: FileText,
    },
    {
        dataKey: 'blog',
        title: "Total Blogs",
        icon: FileText,
    },
    {
        dataKey: 'publication',
        title: "Total Publications",
        icon: BookOpen,
    },
    {
        dataKey: 'document',
        title: "Total Documents",
        icon: File,
    },
];


const actionsData = [
    {
        title: "Goto Article",
        description: "Create a new article",
        icon: FileText,
        action: "articles",
    },
    {
        title: "Goto Blog",
        description: "Create a new publication",
        icon: BookOpen,
        action: "blogs",
    },
    {
        title: "Goto Publication",
        description: "Create a new publication",
        icon: BookOpen,
        action: "publications",
    },
    {
        title: "Goto Document",
        description: "Upload a new document",
        icon: File,
        action: "documents",
    },
];

const statusData = [
    {
        dataKey: 'article',
        title: "Articles"
    },
    {
        dataKey: 'blog',
        title: "Blogs"
    },
    {
        dataKey: 'publication',
        title: "Publications"
    },
    {
        dataKey: 'document',
        title: "Documents"
    },
];

export {
    statsCardData, statusData, actionsData
}