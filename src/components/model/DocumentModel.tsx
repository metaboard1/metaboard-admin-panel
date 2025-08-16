'use client';

import { Dropzone, Input, Label } from "../ui";
import { useFormik } from "formik";
import validationSchema from "@/schema";
import { useEffect } from "react";
import { FileMinus } from "lucide-react";

interface DocumentFormData {
    id: number;
    title: string;
    description: string;
    estimateReadTime: string;
    file: File | null;
}


interface ModelProps {
    title?: string;
    isVisible: boolean;
    defaultData?: Partial<DocumentFormData>;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

const DocumentModel = ({
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
            estimateReadTime: defaultData?.estimateReadTime ?? '',
            file: defaultData?.file ?? null,
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        validationSchema: validationSchema('document'),
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


    const isFile = (file: any): file is File => {
        return file && typeof file === "object" && "name" in file && "size" in file;
    }

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
                    <div className={`relative transform overflow-hidden rounded-lg bg-white border-gray-200 dark:divide-white/[0.05] dark:border-gray-800 text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-3xl
                        ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>

                        <div className=" dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left flex-1">
                                    <h3 className="text-base font-semibold text-gray-900"
                                        id="dialog-title">
                                        {title}
                                    </h3>

                                    <div className="mt-2 flex flex-col gap-3">
                                        <Dropzone
                                            acceptedFileTypes={{
                                                'application/pdf': ['.pdf'],
                                                'application/vnd.ms-powerpoint': ['.ppt'],
                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
                                            }}
                                            fileSize={0.90}
                                            onFileSelect={(file) => {
                                                setFieldValue('file', file);
                                            }}
                                        />

                                        {
                                            values.file &&
                                            <div
                                                className="group max-w-40 cursor-pointer flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-neutral-800 dark:border-neutral-600"
                                            >
                                                <FileMinus size={14} className="text-gray-500 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-300" />
                                                <span className="text-xs text-gray-700 truncate flex-1 group-hover:text-blue-700 transition-colors duration-300" >
                                                    {isFile(values.file) ? values.file.name : values.file}
                                                </span>
                                            </div>
                                        }

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
                                            <Label>Estimate Reading Time</Label>
                                            <Input
                                                placeholder="Enter reading time.."
                                                name="estimateReadTime"
                                                value={values.estimateReadTime}
                                                onChange={handleChange}
                                                error={Boolean(errors.estimateReadTime && touched.estimateReadTime)}
                                                hint={touched.estimateReadTime ? errors.estimateReadTime : ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={onClose}
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
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentModel;