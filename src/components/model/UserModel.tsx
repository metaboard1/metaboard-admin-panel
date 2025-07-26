import { Checkbox, Dropzone, Input, Label } from "../ui";
import { useFormik } from "formik";
import validationSchema from "@/schema";
import { useEffect } from "react";
import Image from "next/image";
import { BASE_ASSETS_URL } from "@/constants";
import { DeleteIcon, Eye, Trash2 } from "lucide-react";
import { ImagePreview } from "../global";

interface UserFormData {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: File | null;
}


interface ModelProps {
    title?: string;
    isVisible: boolean;
    defaultData?: Partial<UserFormData>;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

const UserModel = ({
    title,
    isVisible,
    defaultData,
    onClose,
    onSubmit,
}: ModelProps) => {



    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, resetForm } = useFormik({
        initialValues: {
            name: defaultData?.name ?? '',
            email: defaultData?.email ?? '',
            password: '',
            avatar: defaultData?.avatar ?? ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        validationSchema: validationSchema('user'),
        onSubmit: async (values) => {
            if (defaultData?.id) {
                onSubmit?.({ data: { ...values, id: defaultData?.id }, isEdited: true });
            } else {
                onSubmit?.({ data: values, isEdited: false });
            }
        }
    });

    useEffect(() => {
        !isVisible && resetForm();
    }, [isVisible])

    return (
        <div className={`relative z-10 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-labelledby="dialog-title"
            role="dialog"
            aria-modal="true">

            <div className={`fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-out ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                aria-hidden="true"
                onClick={onClose}>
            </div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                <form noValidate onSubmit={handleSubmit} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg
                        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>

                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left flex-1">
                                    <h3 className="text-base font-semibold text-gray-900"
                                        id="dialog-title">
                                        {title}
                                    </h3>

                                    <div className="mt-2 flex flex-col gap-3">
                                        <Dropzone
                                            acceptedFileTypes={{
                                                'image/jpeg': ['.jpg', '.jpeg', '.png'],
                                            }}
                                            fileSize={0.90}
                                            onFileSelect={(file) => {
                                                setFieldValue('avatar', file);
                                            }}
                                        />
                                        {
                                            values.avatar &&
                                            <div className="relative  w-[150px] cursor-pointer flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600" data-hs-file-upload-trigger="">
                                                <ImagePreview
                                                    src={values.avatar instanceof File ? URL.createObjectURL(values.avatar) : BASE_ASSETS_URL + `/users-avatar/${defaultData?.avatar}`}
                                                    alt="User Avatar"
                                                    className="w-[100%] h-[100px]"
                                                />
                                            </div>
                                        }

                                        <div>
                                            <Label>Name</Label>
                                            <Input
                                                placeholder="Enter name..."
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                error={Boolean(errors.name && touched.name)}
                                                hint={touched.name ? errors.name : ''}
                                            />
                                        </div>

                                        <div>
                                            <Label>Email</Label>
                                            <Input
                                                placeholder="Enter email..."
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                error={Boolean(errors.email && touched.email)}
                                                hint={touched.email ? errors.email : ''}
                                            />
                                        </div>

                                        <div>
                                            <Label>Password</Label>
                                            <Input
                                                placeholder="Enter password..."
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                error={Boolean(errors.password && touched.password)}
                                                hint={touched.password ? errors.password : ''}
                                            />

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                    // resetForm();
                                    onClose();
                                }}
                            // disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            // disabled={isSubmitting}
                            >
                                Submit
                                {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModel;