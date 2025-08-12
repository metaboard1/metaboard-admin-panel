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
import { EllipsisVertical, Plus, Rows, Search, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";



const Articles = () => {

    const [articlesData, setArticlesData] = useState<any>([]);
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
    const articleFormModelRef = useRef<ModalRef>(null);

    useEffect(() => {
        retrieveArticles();
    }, [filterConfig, paginationDetails.limit, paginationDetails.page]);

    const createFormDataFromObj = (data: object) => {
        const formData = new FormData();
        Object.entries(data).map(([Key, value]) => formData.append(Key, typeof value === 'object' && !(value instanceof File) ? JSON.stringify(value) : value));
        return formData;
    }

    const createArticle = async (data: any) => {
        try {
            const { data: { createdData } } = await $crud.create('article', createFormDataFromObj(data));
            setArticlesData((prevData: any) => {
                prevData.unshift(createdData);
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const retrieveArticles = async () => {
        try {
            const { data: { rows, count } } = await $crud.retrieve(`articles?search=${encodeURIComponent(filterConfig.search)}&isActive=${filterConfig.isActive}&createdAt=${filterConfig.createdAt}&limit=${paginationDetails.limit}&page=${paginationDetails.page}`);
            setArticlesData(() => rows);
            setPaginationDetails((prevData) => ({ ...prevData, totalRecords: count }))
        } catch (e) {
            console.error(e);
        }
    }

    const updateArticle = async (data: any) => {
        try {
            const formData = createFormDataFromObj(data);

            const { data: { updatedData } } = await $crud.update('article', formData);
            setArticlesData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id == updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const updateArticleStatus = async (id: number) => {
        try {
            const { data: { updatedData } } = await $crud.patch('article-status', { id });
            setArticlesData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id === updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }
    const transferArticle = async (id: number) => {
        try {
            const { data: { updatedData } } = await $crud.patch('article-transfer', { id });
            setArticlesData((prevData: any) => {
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
            setArticlesData((prevData: any) => {
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
    const deleteArticle = async (id: number) => {
        try {
            deleteModelRef.current?.close();
            const { data: { deletedData: deletedRecordId } } = await $crud.delete('article', { id });
            setArticlesData((prevData: any) => [...prevData.filter((e: any) => deletedRecordId !== e.id)]);
        } catch (e) {
            console.log(e);
        }
    }

    const handleArticleModelOnSubmit = (data: { isEdited: boolean; data: any }) => {
        articleFormModelRef.current?.close();
        if (data.isEdited) {
            updateArticle(data.data);
        } else {
            createArticle(data.data);
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
                    src={BASE_ASSETS_URL + `/articles/${coverImage}`}
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
            id: 'author',
            label: 'Author',
            align: 'center',
        },
        {
            id: 'tags',
            label: 'Tag',
            align: 'center',
            renderCell: (({ tags }) =>
                <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                    #{tags[0]}
                </span>
            )
        },
        {
            id: 'publishedAt',
            label: 'Published Date',
            align: 'center',
            renderCell: ({ publishedAt }) => dayjs(publishedAt).format("DD MMMM YYYY")
        },
        {
            id: 'createdAt',
            label: 'Created At',
            align: 'center',
            renderCell: ({ createdAt }) => dayjs(createdAt).format("DD MMMM YYYY")
        },
        {
            id: 'createdAt',
            label: 'MetaRule',
            align: 'center',
            renderCell: ({ id, isForMetaRule }) => <div className="flex justify-center cursor-pointer" onClick={() => transferArticle(id)}><span className={`flex w-1 h-1 me-2 rounded-full ${isForMetaRule ? 'bg-green-500 shadow-[0_0_5px_3px_rgba(34,197,94,0.9)] animate-pulse' : 'bg-red-500 shadow-[0_0_5px_3px_rgba(239,68,68,0.9)]'}`} /></div>
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
                    <Switch checked={row.isActive} onChange={() => updateArticleStatus(row.id)} />
                    <div className="cursor-pointer" onClick={() => setArticleAsFeatured(row.id)}>
                        <Star fill={row.isFeatured ? 'orange' : 'transparent'} color={row.isFeatured ? 'orange' : 'gray'} />
                    </div>
                    <Dropdown anchor={<EllipsisVertical />} >
                        {
                            dropdownList.map(({ label, icon: Icon, iconClass, navigate }, index) => <button
                                key={index}
                                type="submit"
                                className="flex items-center gap-5  w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    if (navigate) {
                                        window.open(`${navigate}?id=${row.id}`, '_blank');
                                    } else if (label === 'Delete') {
                                        deleteModelRef.current?.open({ id: row.id });
                                    } else if (label === 'Edit') {
                                        articleFormModelRef.current?.open(row);
                                    }
                                }}
                            >
                                {
                                    Icon &&
                                    <Icon size={17} className={iconClass} />
                                }
                                {label}
                            </button>)
                        }
                    </Dropdown>

                </div>
            </>
            ),
        },
    ];




    return (<>
        <div>
            <div className="space-y-6">

                <ComponentCard title="Articles">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_10rem_10rem_auto] items-end">
                        <Input
                            renderLeftIcon={<Search className="text-gray-500" size={14} />}
                            placeholder="Search for article..."
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
                                onClick={() => articleFormModelRef.current?.open()}
                            >
                                Add Article
                                <Plus size={17} />
                            </button>
                        </div>
                    </div>


                    <DataTable
                        columns={columns}
                        rows={articlesData}
                        paginationDetails={paginationDetails}
                        onPageChange={(e) => handlePaginationDetails('page', e)}
                        onLimitChange={(e) => handlePaginationDetails('limit', e)}
                    />

                    <Model
                        ref={deleteModelRef}
                        modelTitle="Delete Article"
                        modelDesc="Are you sure you want to delete the article? The article will be permanently removed. This action cannot be undone."
                        modelName="delete"
                        onSubmit={({ id }) => deleteArticle(id)}
                    />
                    <Model
                        ref={articleFormModelRef}
                        modelTitle="Create Article"
                        modelDesc="Are you sure you want to delete the article? The article will be permanently removed. This action cannot be undone."
                        modelName="article"
                        onSubmit={handleArticleModelOnSubmit}
                    />

                    {/* <button className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
                        onClick={() => console.log(modelRef?.current?.open(), "----------")}>Open dialog</button> */}


                </ComponentCard>
            </div>
        </div>

    </>);
}
export default checkAuthorization(Articles);