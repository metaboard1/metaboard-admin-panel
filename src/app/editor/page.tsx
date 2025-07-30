'use client';

import dynamic from 'next/dynamic';

;

const ClientSideOnlyComponent = dynamic(
    () => import('../../components/local/editor/Editor'),
    { ssr: false }
);


const Page = () => {




    return (<>
        <ClientSideOnlyComponent />
    </>)
}
export default Page;