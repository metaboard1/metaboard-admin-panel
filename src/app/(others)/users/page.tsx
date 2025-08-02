'use client';

import { ComponentCard, DataTable, ImagePreview } from "@/components/global";
import Model, { ModalRef } from "@/components/model/Model";
import { Badge, Input, Switch } from "@/components/ui";
import Dropdown from "@/components/ui/Dropdown";
import { BASE_ASSETS_URL } from "@/constants";
import { $crud } from "@/factory/crudFactory";
import { debounce } from "@/helpers";
import { checkAuthorization } from "@/hoc";
import { TableColumnProps } from "@/types/global";
import dayjs from "dayjs";
import { Edit, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";



const Users = () => {

    const [usersData, setUsersData] = useState<any>([]);
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

    // const deleteModelRef = useRef<ModalRef>(null);
    const userFormModelRef = useRef<ModalRef>(null);

    useEffect(() => {
        retrieveUsers();
    }, [filterConfig, paginationDetails.limit, paginationDetails.page]);

    const createFormDataFromObj = (data: object) => {
        const formData = new FormData();
        Object.entries(data).map(([Key, value]) => formData.append(Key, typeof value === 'object' && !(value instanceof File) ? JSON.stringify(value) : value));
        return formData;
    }

    const createUser = async (data: any) => {
        try {
            const { data: { createdData } } = await $crud.create('user', createFormDataFromObj(data));
            setUsersData((prevData: any) => {
                prevData.unshift(createdData);
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const retrieveUsers = async () => {
        try {
            const { data: { rows, count } } = await $crud.retrieve(`users?search=${filterConfig.search}&isActive=${filterConfig.isActive}&createdAt=${filterConfig.createdAt}&limit=${paginationDetails.limit}&page=${paginationDetails.page}`);
            setUsersData(() => rows);
            setPaginationDetails((prevData) => ({ ...prevData, totalRecords: count }))
        } catch (e) {
            console.error(e);
        }
    }

    const updateUser = async (data: any) => {
        try {
            const formData = createFormDataFromObj(data);

            const { data: { updatedArticle } } = await $crud.update('user', formData);
            setUsersData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id == updatedArticle.id);
                prevData[index] = updatedArticle;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }

    const updateUserStatus = async (id: number) => {
        try {
            const { data: { updatedData } } = await $crud.patch('user-status', { id });
            setUsersData((prevData: any) => {
                const index = prevData.findIndex((e: any) => e.id === updatedData.id);
                prevData[index] = updatedData;
                return [...prevData];
            });
        } catch (e) {
            console.error(e);
        }
    }
   

    const handleArticleModelOnSubmit = (data: { isEdited: boolean; data: any }) => {
        userFormModelRef.current?.close();
        if (data.isEdited) {
            updateUser(data.data);
        } else {
            createUser(data.data);
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
            id: 'avatar',
            label: 'Avatar',
            align: 'center',
            renderCell: ({ avatar }) => (
                <ImagePreview
                    src={BASE_ASSETS_URL + `/users-avatar/${avatar}`}
                    alt="User Avatar"
                    className="inline-block size-9 rounded-full ring-2 ring-white border border-gray-200 cursor-pointer hover:ring-blue-200 hover:border-blue-200 transition duration-200"
                />
            )
        },
        {
            id: 'name',
            label: 'Name',
            align: 'center',
        },
        {
            id: 'email',
            label: 'Email',
            align: 'center',
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
                    <Switch checked={row.isActive} onChange={() => updateUserStatus(row.id)} />
                    <div className="cursor-pointer" onClick={() => userFormModelRef.current?.open(row)}>
                        <Edit size={19} />
                    </div>
                    {/* <div className="cursor-pointer" onClick={deleteModelRef.current?.open} >
                        <Trash2 size={19} className="text-red-500 hover:text-red-700 transition-colors" />
                    </div> */}
                </div>
            </>
            ),
        },
    ];




    return (<>
        <div>
            <div className="space-y-6">

                <ComponentCard title="Users">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_10rem_10rem_auto] items-end">
                        <Input
                            renderLeftIcon={<Search className="text-gray-500" size={14} />}
                            placeholder="Search for user..."
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
                                onClick={() => userFormModelRef.current?.open()}
                            >
                                Add User
                                <Plus size={17} />
                            </button>
                        </div>
                    </div>


                    <DataTable
                        columns={columns}
                        rows={usersData}
                        paginationDetails={paginationDetails}
                        onPageChange={(e) => handlePaginationDetails('page', e)}
                        onLimitChange={(e) => handlePaginationDetails('limit', e)}
                    />

                    {/* <Model
                        ref={deleteModelRef}
                        modelTitle="Delete Article"
                        modelDesc="Are you sure you want to delete the user? The user will be permanently removed. This action cannot be undone."
                        modelName="delete"
                        onSubmit={({ id }) => deleteArticle(id)}
                    /> */}
                    <Model
                        ref={userFormModelRef}
                        modelTitle="Create User"
                        modelName="user"
                        onSubmit={handleArticleModelOnSubmit}
                    />

                </ComponentCard>
            </div>
        </div>

    </>);
}
export default checkAuthorization(Users);