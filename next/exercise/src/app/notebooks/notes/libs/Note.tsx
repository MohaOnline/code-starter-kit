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
        title: string;
        body: string;
        save: null;
    };
}


/* component 有 note 参数，也可有别的参数，打包成一个对象传入。 */
export default function Note({note}: NoteProps) {
    const [status, setStatus] = useState({
        set: null,
        note: note,
        isEditing: false,
        setEditing: null,
    });
    status.note = note;
    status.set = setStatus;
    status.setEditing = (isEditing: boolean) => setStatus({...status, isEditing: isEditing});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setStatus(prev => ({...prev, [name]: value}));
    };

    return (
        <>
            <div className="border note flex flex-col gap-4">
                <h2>{note.title}</h2>
                <div>{note.body}</div>
                <div className="operation">
                    <Button className={'active:translate-y-[1px] active:translate-x-[1px] transition-transform'}
                            onClick={() => {
                                status.set({...status, isEditing: true})
                            }}>Edit</Button>
                </div>
            </div>

            <Drawer open={status.isEditing} onOpenChange={status.setEditing}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Edit Note</DrawerTitle>
                        <DrawerDescription>Modify the title and body of your note.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <input
                            name="title"
                            value={status.note.title}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border"
                            placeholder="Title"
                        />
                        <textarea
                            name="body"
                            value={status.note.body}
                            onChange={handleChange}
                            className="w-full p-2 border"
                            placeholder="Body"
                            rows={4}
                        />
                    </div>
                    <DrawerFooter>
                        <div className={'flex gap-4'}>
                            <Button onClick={status.note.save} className="bg-blue-500 text-white">
                                Save
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose></div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
