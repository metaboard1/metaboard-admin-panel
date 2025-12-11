'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(
    () => import('../../components/local/editorTest/Editor'),
    { ssr: false }
);


const Page = () => {
    return (<>
        <Editor />
    </>)
}
export default Page;