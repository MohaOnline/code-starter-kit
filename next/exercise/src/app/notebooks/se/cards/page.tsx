'use client';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import React, {useState, useEffect, useRef} from 'react';
import {Editor, Toolbar} from '@wangeditor/editor-for-react';
import {Boot, IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor';
import formulaModule from '@wangeditor/plugin-formula'
import {Button} from "@headlessui/react";

Boot.registerModule(formulaModule)

function MyEditor() {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>');
    const code = useRef(null);

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {

    }, []);

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        insertKeys: {
            index: 0,
            keys: [
                'insertFormula', // “插入公式”菜单
                // 'editFormula' // “编辑公式”菜单
            ],
        },
    }; // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        // 选中公式时的悬浮菜单
        hoverbarKeys: {
            formula: {
                menuKeys: ['editFormula'], // “编辑公式”菜单
            },
        },
        // TS 语法
        // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
        MENU_CONF: {
            // 菜单配置
            uploadImage: {base64LimitSize: 10 * 1024 * 1024}
        },
    };

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);

    return (
        <>
            <div style={{border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{borderBottom: '1px solid #ccc'}}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{height: '500px', overflowY: 'hidden'}}
                />
            </div>
            <div ref={code} id={'html-code'} contentEditable={true}
                 style={{marginTop: '15px'}}>{html}</div>
            <Button className={'border'} onClick={() => {
                console.log(code.current.innerText);
                editor.setHtml(code.current.innerText);
            }}>Quick Insert
                Text</Button>
        </>
    );
}

export default MyEditor;