'use client';

import { useRouter } from "next/navigation";
import { type ComponentType } from "react";


const checkAuthorization = <P extends {}>(WrappedComponent: ComponentType<P>) => {

    const ComponentWithAuth = (props: any) => {
        if (typeof window !== 'undefined') {
            const router = useRouter();
            const token = localStorage.getItem("token");

            if (!token) {
                router.replace("/");
                return;
            }
            return <WrappedComponent {...props} />;
        }
    };

    return ComponentWithAuth;
}
export default checkAuthorization;