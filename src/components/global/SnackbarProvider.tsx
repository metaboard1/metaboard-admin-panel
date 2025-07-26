'use client';

import { type ReactNode } from "react";
import { SnackbarProvider as Provider } from "notistack";

interface ImagePreviewProps {
    src: string;
    alt?: string;
    className?: string
}

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider maxSnack={3}>
            {children}
        </Provider>
    );
}
export default SnackbarProvider;
