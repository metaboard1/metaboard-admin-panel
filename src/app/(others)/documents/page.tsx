'use client';

import dropdownList from "@/appData/articleDropdownData";
import { ComponentCard, DataTable, ImagePreview } from "@/components/global";
import Model, { ModalRef } from "@/components/model/Model";
import { Badge, Input, Switch } from "@/components/ui";
import Dropdown from "@/components/ui/Dropdown";
import { BASE_ASSETS_URL } from "@/constants";
import { $crud } from "@/factory/crudFactory";
import { debounce } from "@/helpers";
import { checkAuthorization } from "@/hoc";
import dayjs from "dayjs";
import { EllipsisVertical, Plus, Rows, Search, SquarePen, Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";



const Document = () => {

    const [documentData, setDocumentData] = useState<any>([]);
    const [paginationDetails, setPaginationDetails] = useState({
        limit: 10,
        page: 0,
        totalRecords: 0
    });
    const [filterConfig, setFilterConfig] = useState({
        search: '',
        isActive: '',
        createdAt: ''
    });

    const deleteModelRef = useRef<ModalRef>(null);
    const documentFormModelRef = useRef<ModalRef>(null);

    useEffect(() => {
        retrieveDocuments();
    }, [filterConfig, paginationDetails.limit, paginationDetails.page]);

    const createFormDataFromObj = (data: object) => {
        const formData = new FormData();
        Object.entries(data).map(([Key, value]) => formData.append(Key, typeof value === 'object' && !(value instanceof File) ? JSON.stringify(value) : value));
        return formData;
    }

    const createDocument = async (data: any) => {
        try {
            const { data: { createdData } } = await $crud.create('document', createFormDataFromObj(data));
            setDocumentData((prevData: any) => {
                prevData.unshift(createdData);
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const retrieveDocuments = async () => {
        try {
            const { data: { rows, count } } = await $crud.retrieve(`documents?search=${encodeURIComponent(filterConfig.search)}&isActive=${filterConfig.isActive}&createdAt=${filterConfig.createdAt}&limit=${paginationDetails.limit}&page=${paginationDetails.page}`);
            setDocumentData(() => rows);
            setPaginationDetails((prevData) => ({ ...prevData, totalRecords: count }))
        } catch (e) {
            console.error(e);
        }
    }

    const updateDocument = async (data: any) => {
        try {
            const formData = createFormDataFromObj(data);

            const { data: { updatedData } } = await $crud.update('document', formData);
            setDocumentData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id == updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const updateDocumentStatus = async (id: number) => {
        try {
            const { data: { updatedData } } = await $crud.patch('document-status', { id });
            setDocumentData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id === updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }
 
    const deleteDocument = async (id: number) => {
        try {
            deleteModelRef.current?.close();
            const { data: { deletedData: deletedRecordId } } = await $crud.delete('document', { id });
            setDocumentData((prevData: any) => [...prevData.filter((e: any) => deletedRecordId !== e.id)]);
        } catch (e) {
            console.log(e);
        }
    }

    const handleArticleModelOnSubmit = (data: { isEdited: boolean; data: any }) => {
        documentFormModelRef.current?.close();
        if (data.isEdited) {
            updateDocument(data.data);
        } else {
            createDocument(data.data);
        }
    }

    const handlePaginationDetails = (key: string, value: number) => {
        setPaginationDetails((prevData) => ({
            ...prevData,
            [key]: value
        }));
    }
    const handleFilterConfig = (key: string, value: number | boolean | string) => {
        setFilterConfig((prevData) => ({
            ...prevData,
            [key]: value
        }));
    }

    const calculateFileSize=(fileSize: number)=>{
        const inKb = (fileSize / 1024).toFixed(2);
        const inMb =  Math.floor((fileSize / 1024) / 1024);
        return inMb > 0 ? `${inMb} mb` : `${inKb} kb`
    }

    const handleSearchInputChange = debounce((e) => handleFilterConfig('search', e), 1000);

    const columns: TableColumnProps[] = [
        {
            id: 'id',
            label: '#',
            align: 'left',
        },
        {
            id: 'title',
            label: 'Title',
            align: 'center',
        },
        {
            id: 'description',
            label: 'Description',
            align: 'center',
        },
        {
            id: 'estimateReadTime',
            label: 'Reading Time',
            align: 'center',
            renderCell: ({ estimateReadTime }) => `${estimateReadTime}min`
        },
        {
            id: 'fileSize',
            label: 'File Size',
            align: 'center',
            renderCell: ({ fileSize }) => calculateFileSize(fileSize)
        },
        {
            id: 'file',
            label: 'File Type',
            align: 'center',
            renderCell: (({ file }) =>
                <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                   .{file?.split('.')?.[1]}
                </span>
            )
        },
        {
            id: 'createdAt',
            label: 'Created At',
            align: 'center',
            renderCell: ({ createdAt }) => dayjs(createdAt).format("DD MMMM YYYY")
        },
        {
            id: 'status',
            label: 'Status',
            align: 'center',
            renderCell: ({ isActive }) => <Badge
                size="sm"
                color={isActive ? 'success' : 'error'}
            >
                {isActive ? 'Active' : 'Inactive'}
            </Badge>
        },
        {
            id: 'action',
            label: 'Action',
            align: 'center',
            renderCell: (row) => (<>
                <div className="flex justify-center gap-5">
                    <Switch checked={row.isActive} onChange={() => updateDocumentStatus(row.id)} />
                    <button
                        onClick={() => documentFormModelRef.current?.open(row)}
                    >
                        <SquarePen size={17} />
                    </button>
                    <button
                        onClick={() => deleteModelRef.current?.open({ id: row.id })}
                    >
                        <Trash2 size={17} className="text-red-500 hover:text-red-700 transition-colors" />
                    </button>
                </div>
            </>
            ),
        },
    ];




    return (<>
        <div>
            <div className="space-y-6">

                <ComponentCard title="Documents">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_10rem_10rem_auto] items-end">
                        <Input
                            renderLeftIcon={<Search className="text-gray-500" size={14} />}
                            placeholder="Search for document..."
                            onChange={(e) => handleSearchInputChange(e.target.value)}
                        />

                        <div className="w-full">
                            <Dropdown label="Status">

                                {
                                    [{ label: 'Active', value: true }, { label: 'Inactive', value: false }, { label: 'All', value: '' }].map((e, i) =>
                                        <button
                                            key={i}
                                            type="submit"
                                            className="flex items-center gap-5  w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                            name={e.label}
                                            onClick={() => handleFilterConfig('isActive', e.value)}
                                        >
                                            {e.label}
                                        </button>
                                    )
                                }

                            </Dropdown>
                        </div>

                        <div className="w-full">
                            <Dropdown label="Created At" />
                        </div>

                        <div className="w-full">
                            <button
                                type="button"
                                className="w-full py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                onClick={() => documentFormModelRef.current?.open()}
                            >
                                Add Document
                                <Plus size={17} />
                            </button>
                        </div>
                    </div>


                    <DataTable
                        columns={columns}
                        rows={documentData}
                        paginationDetails={paginationDetails}
                        onPageChange={(e) => handlePaginationDetails('page', e)}
                        onLimitChange={(e) => handlePaginationDetails('limit', e)}
                    />

                    <Model
                        ref={deleteModelRef}
                        modelTitle="Delete Document"
                        modelDesc="Are you sure you want to delete the document? The document will be permanently removed. This action cannot be undone."
                        modelName="delete"
                        onSubmit={({ id }) => deleteDocument(id)}
                    />
                    <Model
                        ref={documentFormModelRef}
                        modelTitle="Create Document"
                        modelName="document"
                        onSubmit={handleArticleModelOnSubmit}
                    />

                    {/* <button className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
                        onClick={() => console.log(modelRef?.current?.open(), "----------")}>Open dialog</button> */}


                </ComponentCard>
            </div>
        </div>

    </>);
}
export default checkAuthorization(Document);