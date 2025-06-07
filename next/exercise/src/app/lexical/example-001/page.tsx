"use client";
// https://ui.shadcn.com/docs/components/drawer#examples

import {useState} from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button"

import "./page.css"

export default function Editor() {

    const [editorState, setEditorState] = useState();
    const [status, setStatus] = useState({});

    // 保存编辑器状态到 editorState
    function onLexicalEditorChange(editorState) {
        setEditorState(editorState);
    }

    const initialConfig = {
        editorState: editorState,
        editable: true,
        theme: {},
        namespace: "LexicalEditor",
        onError: (error: Error) => {
            console.log(error);
        },
    };
    
    return (
        <>


            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Editor</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <LexicalComposer initialConfig={initialConfig}>
                        <RichTextPlugin contentEditable={
                            <ContentEditable className="px-2 py-1 border-2 border-blue-200"/>}
                                        placeholder={
                                            <div className="absolute top-1 left-2 text-gray-500">
                                                プレースホルダー
                                            </div>
                                        }
                                        ErrorBoundary={LexicalErrorBoundary}/>
                        <HistoryPlugin/>
                        <AutoFocusPlugin/>
                        <OnChangePlugin onChange={onLexicalEditorChange}/>
                    </LexicalComposer>
                    <DrawerFooter>
                        <Button>Save</Button>
                        {/*<DrawerClose>*/}
                        {/*    <Button variant="outline">Cancel</Button>*/}
                        {/*</DrawerClose>*/}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}