import { SquareMousePointer, SquarePen, Trash2 } from "lucide-react";

const dropdownList: DropdownItemProps[] = [
    {
        id: 1,
        label: 'Change article content',
        icon: SquareMousePointer,
        navigate: '/editor'
    },
    {
        id: 2,
        label: 'Edit',
        icon: SquarePen,
        navigate: ''
    },
    {
        id: 3,
        label: 'Delete',
        icon: Trash2,
        iconClass: "text-red-500 hover:text-red-700 transition-colors",
        navigate: ''
    },
];
export default dropdownList;