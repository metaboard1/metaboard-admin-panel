
interface DropdownItemProps {
    id: number;
    label: string;
    icon?: React.ElementType;
    iconClass?: string;
    navigate: string
}
interface TableColumnProps {
    id: string;
    label: string;
    align?: any;
    renderCell?: (row: any, index: number) => React.ReactNode
}
interface DataTableProps {
    columns: TableColumnProps[];
    rows: { [key: string]: any }[];
    paginationDetails: {
        limit: number,
        page: number,
        totalRecords: number
    },
    onPageChange?: (e: number) => void
    onLimitChange?: (e: number) => void
};




