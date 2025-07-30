'use client';

import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import pluginBasicBlocks from 'grapesjs-blocks-basic';
import { defaultHtml } from '@/appData';
import { useSearchParams } from 'next/navigation';
import { $crud } from '@/factory/crudFactory';
import parserPostCSS from 'grapesjs-parser-postcss';
import 'grapesjs/dist/css/grapes.min.css';
import customCodePlugin from 'grapesjs-custom-code';
import ImageEditorPlugin from 'grapesjs-tui-image-editor';
// import StylesSuggestionPlugin from '@silexlabs/grapesjs-ui-suggest-classes';
// import CustomFontsPlugin from '@silexlabs/grapesjs-fonts';

const Editor = () => {
    const searchParams = useSearchParams();
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        configureEditor();
    }, []);

    const getArticleContent = async () => {
        try {
            const id = searchParams.get('id');
            const { data: { contentHtml, contentCss } } = await $crud.retrieve(`article-by-id?id=${id}`);
            return {
                html: contentHtml,
                css: contentCss
            }
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



    const configureEditor = async () => {
        if (editorRef.current) {
            const { html, css }: any = await getArticleContent();
            const editor = grapesjs.init({
                container: editorRef.current,
                fromElement: false,
                height: '100vh',
                noticeOnUnload: false,
                storageManager: false,
                canvas: {
                    styles: [
                        'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Georgia&display=swap',
                        '/assets/css/editor.css'
                    ],
                    scripts: [
                        'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@3',
                    ],
                },
                components: html,
                plugins: [parserPostCSS, pluginBasicBlocks, customCodePlugin, ImageEditorPlugin, 
                    // StylesSuggestionPlugin, CustomFontsPlugin
                ],

                // pluginsOpts: {
                //     [CustomFontsPlugin]: {
                //         api_key: 'AIzaSyBHkMykDpfJpdDMZYEH6zqcz9-jCQPeS4E',
                //     },

                // },
                blockManager: {
                    appendTo: '#blocks',
                },

            });
            injectElements(editor);

            editor.on('load', () => {
                editor.setStyle(css);
                editor.Panels.addButton('options', [
                    {
                        id: 'open-fonts',
                        className: 'fa fa-font',
                        command: 'open-fonts',
                        attributes: { title: 'Open Fonts' }
                    }
                ]);
            });
        }
    }
    const injectElements = (editor: any) => {

        editor.BlockManager.add('paragraph', {
            label: 'Paragraph',
            content: '<p>Insert your paragraph text here...</p>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" />
        </svg>`,
        });

        editor.BlockManager.add('blockquote', {
            label: 'Quote',
            content: '<blockquote>Insert your quote here...</blockquote>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
        </svg>`,
        });

        editor.BlockManager.add('h1', {
            label: 'Heading 1',
            content: '<h1>Heading 1</h1>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16.5V6.5H14V4.5H21V6.5H19V16H21.5V18H14Z" />
        </svg>`,
        });

        editor.BlockManager.add('h2', {
            label: 'Heading 2',
            content: '<h2>Heading 2</h2>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L16,14.66V15H21V18Z" />
        </svg>`,
        });

        editor.BlockManager.add('h3', {
            label: 'Heading 3',
            content: '<h3>Heading 3</h3>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H21V6H15V10H17A4,4 0 0,1 21,14A4,4 0 0,1 17,18H15V16H17A2,2 0 0,0 19,14A2,2 0 0,0 17,12H15V4Z" />
        </svg>`,
        });

        editor.BlockManager.add('unordered-list', {
            label: 'Bullet List',
            content: '<ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
        </svg>`,
        });

        editor.BlockManager.add('ordered-list', {
            label: 'Numbered List',
            content: '<ol><li>List item 1</li><li>List item 2</li><li>List item 3</li></ol>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 3.5,10.75C3.5,10.95 3.92,11.5 4.25,11.5A0.75,0.75 0 0,1 5,10.75A0.75,0.75 0 0,1 4.25,10Z" />
        </svg>`,
        });

        editor.BlockManager.add('strong', {
            label: 'Bold Text',
            content: '<strong>Bold text</strong>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9.02 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
        </svg>`,
        });

        editor.BlockManager.add('emphasis', {
            label: 'Italic Text',
            content: '<em>Italic text</em>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
        </svg>`,
        });

        editor.BlockManager.add('link', {
            label: 'Link',
            content: '<a href="#">Link text</a>',
            category: 'Text',
            media: `<svg viewBox="0 0 24 24">
          <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
        </svg>`,
        });

        editor.BlockManager.add('article-content', {
            label: 'Article',
            content: defaultHtml,
            category: 'Templates',
        });

        editor.Panels.addButton('options', [{
            id: 'save',
            className: 'fa fa-floppy-o',
            command: 'save-template',
            attributes: { title: 'Save' }
        }]);

        editor.Commands.add('save-template', {
            run(editor: any, sender: any) {
                sender && sender.set('active');

                let html = editor.getHtml();
                let css = editor.getCss();
                html = html.replace(/<body[^>]*>/gi, '').replace(/<\/body>/gi, '');
                css = css.replace(/\*\s*\{\s*box-sizing:\s*border-box;\s*\}/gi, '');
                css = css.replace(/body\s*\{\s*margin:\s*0;\s*\}/gi, '');
                css = css.replace(/body\s*\{\s*margin-top:\s*0px;\s*margin-right:\s*0px;\s*margin-bottom:\s*0px;\s*margin-left:\s*0px;\s*\}/gi, '');
                css = css.trim();
                updateArticleContent(html, css);
            }
        });
    }
    return (<>
        <div style={{ display: 'flex', height: '100vh' }}>

            <div
                id="blocks"
                style={{
                    width: '260px',
                    borderRight: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    overflowY: 'auto',
                    height: '100vh',
                }}
                className="gjs-blocks-panel"
            />

            <div ref={editorRef} style={{ flex: 1 }} />
        </div>
    </>)
}
export default Editor;