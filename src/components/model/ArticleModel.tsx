import { Checkbox, Dropzone, Input, Label } from "../ui";
import { useFormik } from "formik";
import validationSchema from "@/schema";
import { useEffect } from "react";
import Image from "next/image";
import { BASE_ASSETS_URL } from "@/constants";
import { DeleteIcon, Eye, Trash2 } from "lucide-react";
import { ImagePreview } from "../global";

interface ArticleFormData {
    id: number;
    title: string;
    description: string;
    author: string;
    authorSocials: {
        facebook: 'string',
        twitter: 'string',
        linkedin: 'string'
    };
    estimateReadTime: string;
    coverImage: File | null;
}


interface ModelProps {
    title?: string;
    isVisible: boolean;
    defaultData?: Partial<ArticleFormData>;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

const ArticleModel = ({
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
            author: defaultData?.author ?? '',
            estimateReadTime: defaultData?.estimateReadTime ?? '',
            coverImage: defaultData?.coverImage ?? null,
            authorSocials: {
                twitter: defaultData?.authorSocials?.twitter ?? '',
                facebook: defaultData?.authorSocials?.facebook ?? '',
                linkedin: defaultData?.authorSocials?.linkedin ?? ''
            }
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        validationSchema: validationSchema('article'),
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
                    <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-3xl
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
                                                setFieldValue('coverImage', file);
                                            }}
                                        />
                                        {
                                            values.coverImage &&
                                            <div className="relative  w-[150px] cursor-pointer flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600" data-hs-file-upload-trigger="">
                                                <ImagePreview
                                                    src={values.coverImage instanceof File ? URL.createObjectURL(values.coverImage) : BASE_ASSETS_URL + `/article-cover-images/${defaultData?.coverImage}`}
                                                    alt="Article Cover"
                                                    className="w-[100%] h-[100px]"
                                                />
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
                                            <Label>Estimate read time (min)</Label>
                                            <Input
                                                placeholder="Enter estimate read time..."
                                                name="estimateReadTime"
                                                value={values.estimateReadTime}
                                                onChange={handleChange}
                                                error={Boolean(errors.estimateReadTime && touched.estimateReadTime)}
                                                hint={touched.estimateReadTime ? errors.estimateReadTime : ''}
                                                type='number'
                                            />
                                        </div>

                                        <div>
                                            <Label>Author</Label>
                                            <Input
                                                placeholder="Enter Author..."
                                                name="author"
                                                value={values.author}
                                                onChange={handleChange}
                                                error={Boolean(errors.author && touched.author)}
                                                hint={touched.author ? errors.author : ''}
                                            />
                                        </div>
                                        <div className="flex justify-between gap-5">

                                            <div>
                                                <Label>Linkedin</Label>
                                                <Input
                                                    placeholder="Enter Author..."
                                                    name="authorSocials.linkedin"
                                                    value={values.authorSocials.linkedin}
                                                    onChange={handleChange}
                                                    error={Boolean(errors.authorSocials?.linkedin && errors.authorSocials?.linkedin)}
                                                    hint={errors.authorSocials?.linkedin ? errors.authorSocials?.linkedin : ''}
                                                />
                                            </div>
                                            <div>
                                                <Label>Facebook</Label>
                                                <Input
                                                    placeholder="Enter Author..."
                                                    name="authorSocials.facebook"
                                                    value={values.authorSocials.facebook}
                                                    onChange={handleChange}
                                                    error={Boolean(errors.authorSocials?.facebook && errors.authorSocials?.facebook)}
                                                    hint={errors.authorSocials?.facebook ? errors.authorSocials?.facebook : ''}
                                                />
                                            </div>
                                            <div>
                                                <Label>Twitter</Label>
                                                <Input
                                                    placeholder="Enter Author..."
                                                    name="authorSocials.twitter"
                                                    value={values.authorSocials.twitter}
                                                    onChange={handleChange}
                                                    error={Boolean(errors.authorSocials?.twitter && touched.authorSocials?.twitter)}
                                                    hint={touched.authorSocials?.twitter ? errors.authorSocials?.twitter : ''}
                                                />
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

export default ArticleModel;