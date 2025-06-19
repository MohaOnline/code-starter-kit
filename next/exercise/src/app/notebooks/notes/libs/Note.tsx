// components/NoteItem.tsx

import {useState} from 'react';
import {Button} from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";


import "./Note.css"

interface NoteProps {
    note: {
        id: number | string;
        tid: number | string;
        title: string;
        body: string;
        question: string;
        answer: string;
        save: null;
    };
}


/* React component 有 note 参数，也可有别的参数，打包成一个对象传入。 */
export default function Note({note}: NoteProps) {
    const [local, setLocal] = useState({
        set: null,
        note: note,
        isEditing: false,   // 开关编辑 Drawer
        setEditing: null,
    });
    local.set = setLocal;
    local.setEditing = (isEditing: boolean) => setLocal(prev => ({...prev, isEditing: isEditing}));


    // Handle changes of note items.
    const handleChange = (e) => {

        const {name, value} = e.target;
        setLocal({
             ...local, 
             note: { ...local.note, [name]: value } 
        });
    };

    // Handle saving function.
    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(
            '/api/notebooks/notes/crud',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update',
                    note: local.note,
                }),
            });
        const data = await response.json();
        console.log(data);
        local.setEditing(false);
    }

    return (
        <>
            <div className="border note flex flex-col gap-4">
                {note.tid === '16' && 
                  <><div dangerouslySetInnerHTML={{__html: note.question}}></div>
                    <div dangerouslySetInnerHTML={{__html: note.answer}}></div>
                  </>}
                  
                {note.tid != '16' && <><h2>{note.title}</h2><div>{note.body}</div></>}

                <div className="operation">
                    <Button className={'active:translate-y-[1px] active:translate-x-[1px] transition-transform'}
                            onClick={() => {
                                local.setEditing(true);
                            }}>Edit</Button>
                </div>
            </div>

            <Drawer open={local.isEditing} onOpenChange={local.setEditing} dismissible={false} >
                <DrawerContent >
                    <DrawerHeader>
                        <DrawerTitle>Edit Note</DrawerTitle>
                        <DrawerDescription>Modify the title and body of your note.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <input
                            name="title"
                            value={local.note.title}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border"
                            placeholder="Title"
                        />
                        <textarea
                            name="body"
                            value={local.note.body}
                            onChange={handleChange}
                            className="w-full p-2 border"
                            placeholder="Body"
                            rows={10}
                        />
                    </div>
                    <DrawerFooter>
                        <div className={'flex gap-4'}>
                            <Button onClick={handleUpdate} className="bg-blue-500 text-white">
                                Update
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" onClick={() => {
                                    local.isEditing = false;
                                    setLocal({...local});
                                }}>Cancel</Button>
                            </DrawerClose></div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
