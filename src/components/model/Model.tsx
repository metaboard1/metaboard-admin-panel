import React, { useImperativeHandle, useState } from "react";
import DeleteModel from "./DeleteModel";
import ArticleModel from "./ArticleModel";
import UserModel from "./UserModel";
import PublicationModel from "./PublicationModel";
import DocumentModel from "./DocumentModel";

export interface ModalRef {
    open: (e?: object) => void;
    close: () => void;
}
interface ModelProps {
    modelName: string;
    modelTitle?: string;
    modelDesc?: string;
    onSubmit?: (e?: any) => void;
    ref: React.Ref<ModalRef>;
}

const Model = ({ modelName, modelTitle, modelDesc, onSubmit, ref }: ModelProps) => {

    const [modelData, setModelData] = useState<{
        isVisible: boolean;
        defaultData: any
    }>({
        isVisible: false,
        defaultData: {}
    });

    useImperativeHandle(ref, () => ({
        open: (e: object = {}) => setModelData(() => ({ isVisible: true, defaultData: e })),
        close: handleClose,
    }));

    const handleClose = () => setModelData(() => ({ isVisible: false, defaultData: {} }));

    return (<>

        {
            modelName === 'delete' &&
            <DeleteModel
                title={modelTitle}
                desc={modelDesc}
                isVisible={modelData.isVisible}
                deletionId={modelData.defaultData.id}
                onClose={handleClose}
                onSubmit={onSubmit}
            />
        }
        {
            modelName === 'article' &&
            <ArticleModel
                title={modelTitle}
                isVisible={modelData.isVisible}
                onClose={handleClose}
                onSubmit={onSubmit}
                defaultData={modelData.defaultData}
            />
        }
        {
            modelName === 'user' &&
            <UserModel
                title={modelTitle}
                isVisible={modelData.isVisible}
                onClose={handleClose}
                onSubmit={onSubmit}
                defaultData={modelData.defaultData}
            />
        }
        {
            modelName === 'publication' &&
            <PublicationModel
                title={modelTitle}
                isVisible={modelData.isVisible}
                onClose={handleClose}
                onSubmit={onSubmit}
                defaultData={modelData.defaultData}
            />
        }
        {
            modelName === 'document' &&
            <DocumentModel
                title={modelTitle}
                isVisible={modelData.isVisible}
                onClose={handleClose}
                onSubmit={onSubmit}
                defaultData={modelData.defaultData}
            />
        }

    </>);
}
export default Model;