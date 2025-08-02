'use client';

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "../ui/Dropdown";



const DataTable = ({
    columns,
    rows,
    paginationDetails,
    onPageChange,
    onLimitChange
}: DataTableProps) => {

    return (<>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px] min-h-[30vh]   max-h-[60vh] overflow-y-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-white/[0.05] border-b border-gray-200 dark:border-white/[0.05] text-gray-700 dark:text-gray-300 text-xs tracking-wider">
                            <tr>
                                {
                                    columns?.map((column) =>
                                        <th key={column.id} style={{ textAlign: column.align }}
                                            className="px-5 py-3 font-medium text-black text-start text-theme-sm dark:text-gray-400"
                                        >
                                            {column.label}
                                        </th>
                                    )
                                }
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

                            {rows?.map((row: any, rowIndex: number) => (
                                <tr key={rowIndex} className="hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors">
                                    {
                                        columns?.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <td style={{ textAlign: column.align }} key={column.id} className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    {
                                                        typeof column.renderCell === 'function' ? column.renderCell(row, rowIndex) : (value ?? 'N/A')
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

            </div>

        </div>

        <div className="justify-center sm:flex sm:justify-between sm:items-center gap-2">
            <div>
                <Dropdown>
                    {
                        [10, 25, 50, 'All'].map((e, i) =>
                            <button
                                key={i}
                                type="submit"
                                className="flex items-center gap-5  w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => onLimitChange?.(typeof e === 'number' ? e : paginationDetails.totalRecords)}
                                name={e.toString() + ' Records'}
                            >
                                {e}
                            </button>
                        )
                    }

                </Dropdown>

            </div>

            <div className="flex">
                <button
                    type="button"
                    className="min-h-8 min-w-8 py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Previous"
                    onClick={() => {
                        (paginationDetails.page > 0) && onPageChange?.(paginationDetails.page - 1);
                    }}
                >
                    <ChevronLeft className="text-gray-400" />
                </button>

                <div className="flex items-center gap-x-1">
                    {
                        new Array(Math.ceil(paginationDetails.totalRecords / paginationDetails.limit)).fill(null).map((e, index) =>
                            <button
                                key={index}
                                type="button"
                                className={`${(paginationDetails.page === index) ? "bg-gray-200 focus:bg-gray-300" : "focus:bg-gray-300"} min-h-8 min-w-8 flex justify-center items-center text-gray-800 py-1.5 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none`}
                                aria-current="page"
                                onClick={() => onPageChange?.(index)}
                            >
                                {index + 1}
                            </button>
                        )
                    }
                    {/* <button type="button" className="min-h-8 min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1.5 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">2</button> */}
                    {/* <button type="button" className="min-h-8 min-w-8 flex justify-center items-center bg-gray-200 text-gray-800 py-1.5 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none" aria-current="page">1</button>
                    <button type="button" className="min-h-8 min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1.5 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">2</button>
                    <button type="button" className="min-h-8 min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1.5 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">3</button>
                    <span className="text-[10px] group-hover:hidden">•••</span>
                    <button type="button" className="min-h-8 min-w-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1.5 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">8</button> */}
                </div>

                <button
                    type="button"
                    className="min-h-8 min-w-8 py-1.5 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Next"
                    onClick={() => (paginationDetails.page + 1 < Math.ceil(paginationDetails.totalRecords / paginationDetails.limit)) && onPageChange?.(paginationDetails.page + 1)}
                >
                    <ChevronRight className="text-gray-400" />
                </button>
            </div>

        </div>

    </>
    );
}

export default DataTable;