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
import { EllipsisVertical, ExternalLink, Plus, Rows, Search, SquarePen, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";



const Publications = () => {

    const [publicationsData, setPublicationsData] = useState<any>([]);
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
    const publicationFormModelRef = useRef<ModalRef>(null);

    useEffect(() => {
        retrievePublications();
    }, [filterConfig, paginationDetails.limit, paginationDetails.page]);

    const createFormDataFromObj = (data: object) => {
        const formData = new FormData();
        Object.entries(data).map(([Key, value]) => formData.append(Key, typeof value === 'object' && !(value instanceof File) ? JSON.stringify(value) : value));
        return formData;
    }

    const createPublication = async (data: any) => {
        try {
            const { data: { createdData } } = await $crud.create('metarule/publication', createFormDataFromObj(data));
            setPublicationsData((prevData: any) => {
                prevData.unshift(createdData);
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const retrievePublications = async () => {
        try {
            const { data: { rows, count } } = await $crud.retrieve(`metarule/publications?search=${filterConfig.search}&isActive=${filterConfig.isActive}&createdAt=${filterConfig.createdAt}&limit=${paginationDetails.limit}&page=${paginationDetails.page}`);
            setPublicationsData(() => rows);
            setPaginationDetails((prevData) => ({ ...prevData, totalRecords: count }))
        } catch (e) {
            console.error(e);
        }
    }

    const updatePublication = async (data: any) => {
        try {
            const formData = createFormDataFromObj(data);

            const { data: { updatedData } } = await $crud.update('metarule/publication', formData);
            setPublicationsData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id == updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const updatePublicationStatus = async (id: number) => {
        try {
            const { data: { updatedData } } = await $crud.patch('metarule/publication-status', { id });
            setPublicationsData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id === updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }
    const setArticleAsFeatured = async (id: number) => {
        try {
            const { data: { updatedData } } = await $crud.patch('article-set-featured', { id });
            setPublicationsData((prevData: any) => {
                const featuredIndex = prevData.findIndex((e: any) => e.isFeatured);
                if (featuredIndex > -1) {
                    prevData[featuredIndex] = {
                        ...prevData[featuredIndex],
                        isFeatured: false
                    };
                }
                const index = prevData.findIndex((e: any) => e.id === updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }
    const deletePublication = async (id: number) => {
        try {
            deleteModelRef.current?.close();
            const { data: { deletedData: deletedRecordId } } = await $crud.delete('metarule/publication', { id });
            setPublicationsData((prevData: any) => [...prevData.filter((e: any) => deletedRecordId !== e.id)]);
        } catch (e) {
            console.log(e);
        }
    }

    const handleArticleModelOnSubmit = (data: { isEdited: boolean; data: any }) => {
        publicationFormModelRef.current?.close();
        if (data.isEdited) {
            updatePublication(data.data);
        } else {
            createPublication(data.data);
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

    const handleSearchInputChange = debounce((e) => handleFilterConfig('search', e), 1000);

    const columns: TableColumnProps[] = [
        {
            id: 'id',
            label: '#',
            align: 'left',
        },
        {
            id: 'coverImage',
            label: 'Cover Image',
            align: 'center',
            renderCell: ({ coverImage }) => (
                <ImagePreview
                    // src={BASE_ASSETS_URL + `/publications/${coverImage}`}
                    src={coverImage}
                    alt="Article Cover"
                    className="inline-block size-9 rounded-full ring-2 ring-white border border-gray-200 cursor-pointer hover:ring-blue-200 hover:border-blue-200 transition duration-200"
                />
            )
        },
        {
            id: 'title',
            label: 'Title',
            align: 'center',
        },
        {
            id: 'pages',
            label: 'Pages',
            align: 'center'
        },
        {
            id: 'isbn',
            label: 'ISBN',
            align: 'center',
        },
        {
            id: 'publisher',
            label: 'Publisher',
            align: 'center'
        },
        {
            id: 'publicationDate',
            label: 'Publication Date',
            align: 'center',
            renderCell: ({ publicationDate }) => dayjs(publicationDate).format("DD MMMM YYYY")
        },
        {
            id: 'createdAt',
            label: 'Created At',
            align: 'center',
            renderCell: ({ createdAt }) => dayjs(createdAt).format("DD MMMM YYYY")
        },
        {
            id: 'storeLinks',
            label: 'Store Links',
            align: 'center',
            renderCell: ({ storeLinks }) => <div className="flex items-center justify-center gap-2">
                <Link
                    href={storeLinks.amazon ?? '#'}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800"
                >
                    <ExternalLink size={17} />
                </Link>
                <Link
                    href={storeLinks.flipkart ?? '#'}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800"
                >
                    <ExternalLink size={17} />
                </Link>
            </div>
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
                    <Switch checked={row.isActive} onChange={() => updatePublicationStatus(row.id)} />
                    <button
                        onClick={() => publicationFormModelRef.current?.open(row)}
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

                <ComponentCard title="Publications">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_10rem_10rem_auto] items-end">
                        <Input
                            renderLeftIcon={<Search className="text-gray-500" size={14} />}
                            placeholder="Search for publication..."
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
                                onClick={() => publicationFormModelRef.current?.open()}
                            >
                                Add Publication
                                <Plus size={17} />
                            </button>
                        </div>
                    </div>


                    <DataTable
                        columns={columns}
                        rows={publicationsData}
                        paginationDetails={paginationDetails}
                        onPageChange={(e) => handlePaginationDetails('page', e)}
                        onLimitChange={(e) => handlePaginationDetails('limit', e)}
                    />

                    <Model
                        ref={deleteModelRef}
                        modelTitle="Delete Publication"
                        modelDesc="Are you sure you want to delete the publication? The publication will be permanently removed. This action cannot be undone."
                        modelName="delete"
                        onSubmit={({ id }) => deletePublication(id)}
                    />
                    <Model
                        ref={publicationFormModelRef}
                        modelTitle="Create Publication"
                        modelName="publication"
                        onSubmit={handleArticleModelOnSubmit}
                    />

                    {/* <button className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
                        onClick={() => console.log(modelRef?.current?.open(), "----------")}>Open dialog</button> */}


                </ComponentCard>
            </div>
        </div>

    </>);
}
export default checkAuthorization(Publications);