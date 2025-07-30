import { Checkbox, Dropzone, Input, Label } from "../ui";
import { useFormik } from "formik";
import validationSchema from "@/schema";
import { useEffect } from "react";
import Image from "next/image";
import { BASE_ASSETS_URL } from "@/constants";
import { DeleteIcon, Eye, Trash2 } from "lucide-react";
import { ImagePreview } from "../global";
import dayjs from "dayjs";

interface PublicationFormData {
    id: number;
    title: string;
    description: string;
    pages: number;
    isbn: string;
    publisher: string;
    publicationDate: string;
    storeLinks: {
        amazon: string,
        flipkart: string
    }
    coverImage: File | null;
}


interface ModelProps {
    title?: string;
    isVisible: boolean;
    defaultData?: Partial<PublicationFormData>;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

const PublicationModel = ({
    title,
    isVisible,
    defaultData,
    onClose,
    onSubmit,
}: ModelProps) => {

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, resetForm } = useFormik({
        initialValues: {
            title: defaultData?.title ?? '',
            description: defaultData?.description ?? '',
            pages: defaultData?.pages ?? '',
            isbn: defaultData?.isbn ?? '',
            publisher: defaultData?.publisher ?? '',
            publicationDate: dayjs(defaultData?.publicationDate).format("YYYY-DD-MM")  ?? '',
            coverImage: defaultData?.coverImage ?? null,
            storeLinks: {
                amazon: defaultData?.storeLinks?.amazon ?? '',
                flipkart: defaultData?.storeLinks?.flipkart ??''
            }
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        validationSchema: validationSchema('publication'),
        onSubmit: async (values) => {
            console.log(values)
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
                    <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-3xl
                        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>

                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left flex-1">
                                    <h3 className="text-base font-semibold text-gray-900"
                                        id="dialog-title">
                                        {title}
                                    </h3>

                                    <div className="mt-2 flex flex-col gap-6">


                                        <Dropzone
                                            acceptedFileTypes={{
                                                'image/jpeg': ['.jpg', '.jpeg', '.png'],
                                            }}
                                            fileSize={0.90}
                                            onFileSelect={(file) => {
                                                setFieldValue('coverImage', file);
                                            }}
                                        />
                                        {
                                            values.coverImage &&
                                            <div className="relative  w-[150px] cursor-pointer flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600" data-hs-file-upload-trigger="">
                                                <ImagePreview
                                                    src={values.coverImage instanceof File ? URL.createObjectURL(values.coverImage) : BASE_ASSETS_URL + `/publications/${defaultData?.coverImage}`}
                                                    alt="Publication Cover"
                                                    className="w-[100%] h-[100px]"
                                                />
                                            </div>
                                        }

                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-md font-semibold text-gray-900">
                                                General Info:
                                            </h3>

                                            <div>
                                                <Label>Title</Label>
                                                <Input
                                                    placeholder="Enter title..."
                                                    name="title"
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    error={Boolean(errors.title && touched.title)}
                                                    hint={touched.title ? errors.title : ''}
                                                />
                                            </div>

                                            <div>
                                                <Label>Description</Label>
                                                <Input
                                                    renderType='textarea'
                                                    placeholder="Enter description..."
                                                    name="description"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    error={Boolean(errors.description && touched.description)}
                                                    hint={touched.description ? errors.description : ''}
                                                />
                                            </div>

                                            <div>
                                                <Label>No of Pages</Label>
                                                <Input
                                                    placeholder="Enter total pages of publication..."
                                                    name="pages"
                                                    // @ts-ignore
                                                    value={values.pages}
                                                    onChange={handleChange}
                                                    error={Boolean(errors.pages && touched.pages)}
                                                    hint={touched.pages ? errors.pages : ''}
                                                    type='number'
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-md font-semibold text-gray-900">
                                                Publication Details:
                                            </h3>
                                            <div className="flex justify-between gap-5">
                                                <div className="w-1/2">
                                                    <Label>ISBN no.</Label>
                                                    <Input
                                                        placeholder="Enter ISBN number..."
                                                        name="isbn"
                                                        value={values.isbn}
                                                        onChange={handleChange}
                                                        error={Boolean(errors.isbn && errors.isbn)}
                                                        hint={errors.isbn ? errors.isbn : ''}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <Label>Publisher</Label>
                                                    <Input
                                                        placeholder="Enter Publisher..."
                                                        name="publisher"
                                                        value={values.publisher}
                                                        onChange={handleChange}
                                                        error={Boolean(errors.publisher && errors.publisher)}
                                                        hint={errors.publisher ? errors.publisher : ''}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <Label>Publication Date</Label>
                                                    <Input
                                                        placeholder="Enter Author..."
                                                        name="publicationDate"
                                                        type="date"
                                                        value={values.publicationDate}
                                                        onChange={handleChange}
                                                        error={Boolean(errors.publicationDate && touched.publicationDate)}
                                                        hint={touched.publicationDate ? errors.publicationDate : ''}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-md font-semibold text-gray-900">
                                                Store Links:
                                            </h3>
                                            <div className="flex justify-between gap-5">
                                                <div className="w-1/2">
                                                    <Label>Amazon</Label>
                                                    <Input
                                                        placeholder="Amazon store url..."
                                                        name="storeLinks.amazon"
                                                        value={values.storeLinks.amazon}
                                                        onChange={handleChange}
                                                        error={Boolean(errors.storeLinks?.amazon && touched.storeLinks?.amazon)}
                                                        hint={touched.storeLinks?.amazon ? errors.storeLinks?.amazon : ''}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <Label>Flipkart</Label>
                                                    <Input
                                                        placeholder="Flipkart store url..."
                                                        name="storeLinks.flipkart"
                                                        value={values.storeLinks.flipkart}
                                                        onChange={handleChange}
                                                        error={Boolean(errors.storeLinks?.flipkart && touched.storeLinks?.flipkart)}
                                                        hint={touched.storeLinks?.flipkart ? errors.storeLinks?.flipkart : ''}
                                                    />
                                                </div>
                                            </div>

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

export default PublicationModel;