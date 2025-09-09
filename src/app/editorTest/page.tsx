'use client';

import dynamic from 'next/dynamic';

const ClientSideOnlyComponent = dynamic(
    () => import('../../components/local/editorTest/Editor'),
    { ssr: false }
);


const Page = () => {
    return (<>
        <ClientSideOnlyComponent />
    </>)
}
export default Page;