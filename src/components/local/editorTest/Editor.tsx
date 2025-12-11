'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { $crud } from '@/factory/crudFactory';
import StudioEditor from '@grapesjs/studio-sdk/react';
import { tableComponent, listPagesComponent, flexComponent, rteTinyMce, youtubeAssetProvider, rteProseMirror, layoutSidebarButtons } from '@grapesjs/studio-sdk-plugins';
import '@grapesjs/studio-sdk/style';
import { v4 as uuidv4 } from 'uuid';
import { defaultBlocksCode } from '@/appData/defaultHtml';

const Editor = () => {
    const searchParams = useSearchParams();
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getArticleContent();
    }, []);

    const getArticleContent = async () => {
        try {
            const id = searchParams.get('id');
            const { data: { contentHtml, contentCss } } = await $crud.retrieve(`article-by-id?id=${id}`);
            return `<style>${contentCss}</style> ${contentHtml}`
        } catch (e) {
            console.log(e)
        }
    }
    const updateArticleContent = async (html: string, css: string) => {
        try {
            const id = searchParams.get('id');
            $crud.update('article-content', {
                id,
                html,
                css
            });
        } catch (e) {
            console.log(e)
        }
    }


    const handleReady = (editorInstance: any) => {
        editorRef.current = editorInstance;
    };

    const handleSave = async ({ project }: any) => {
        const editor: any = editorRef.current;
        if (!editor) return;

        const html = editor.getHtml();
        const css = editor.getCss();
        updateArticleContent(html, css)
    };

    const editorConfig = {
        blocks: {
            default: [
                {
                    id: 'content-template',
                    label: 'Article/Blog Template',
                    category: 'Templates',
                    media: '<svg viewBox="0 -960 960 960"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>',
                    content: defaultBlocksCode.articleTemplate,
                    select: true
                },
                {
                    id: 'div',
                    label: 'Div',
                    category: 'Basic',
                    media: '<svg viewBox="0 -960 960 960"><path d="M200-200h560v-560H200v560Zm-80 80v-720h720v720H120Zm160-320v-80h80v80h-80Zm160 160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 160v-80h80v80h-80Z"/></svg>',
                    content: defaultBlocksCode.div,
                    select: true
                },
                {
                    id: 'OL',
                    label: 'Numbered List',
                    category: 'Basic',
                    media: '<svg viewBox="0 -960 960 960"><path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z"/></svg>',
                    content: defaultBlocksCode.ol,
                    select: true
                },
                {
                    id: 'UL',
                    label: 'Bullet List',
                    category: 'Basic',
                    media: '<svg viewBox="0 -960 960 960"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>',
                    content: defaultBlocksCode.ul,
                    select: true
                },
                {
                    id: 'para',
                    label: 'Paragraph',
                    category: 'Basic',
                    media: '<svg viewBox="0 -960 960 960"><path d="M240-120v-720h280q100 0 170 70t70 170q0 100-70 170t-170 70H400v240H240Zm160-400h128q33 0 56.5-23.5T608-600q0-33-23.5-56.5T528-680H400v160Z"/></svg>',
                    content: defaultBlocksCode.p,
                    select: true
                },
            ]
        },
        licenseKey: 'ed1a169e97564eb5bdfc6b2bba3ce5cb51ad399bba8641c09ead66eb88477768',
        project: {
            type: 'web',
            id: 'test',
            default: {
                pages: [
                    // { name: 'Home', component: defaultHtml },
                    { name: 'About', component: '<h1>About page</h1>' },
                    { name: 'Contact', component: '<h1>Contact page</h1>' },
                ]
            },
        },
        identity: {
            id: uuidv4()
        },
        assets: {
            storageType: 'cloud'
        },
        plugins: [
            tableComponent.init({}),
            listPagesComponent.init({}),
            flexComponent.init({}),
            rteProseMirror.init({}),
            layoutSidebarButtons.init({}),
            youtubeAssetProvider.init({
                apiKey: 'AIzaSyDciY-5a50R7ZkWopGjQO4T0msWP20DTQA',
                searchParams: ({ searchValue }) => ({
                    q: searchValue || '',
                })
            }),
        ],
        storage: {
            type: 'self',
            onSave: handleSave,
            onLoad: async () => {
                return {
                    project: {
                        pages: [
                            { name: 'Article', component: await getArticleContent() },
                        ]
                    }
                };
            },
            autosaveChanges: 100,
            autosaveIntervalMs: 1000000
        },
    };



    return (<>
        <StudioEditor
            style={{ height: '100vh' }}
            onReady={handleReady}
            options={editorConfig as any}
        />
    </>)
}
export default Editor;