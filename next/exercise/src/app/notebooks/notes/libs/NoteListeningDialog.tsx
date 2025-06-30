/**
 *
 */

import {useState, useEffect} from 'react';
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


/* React component 有 note 参数，也可有别的参数，打包成一个对象传入。 */
export default function Note({note}) {
    const [local, setLocal] = useState({
        set: null,
        note: note,
        isEditing: false,   // 开关编辑 Drawer
        setEditing: null,
        answers: {},  // 存储答案选择
        shuffledChoices: [],  // 随机排序的选项
    });
    local.set = setLocal;
    local.setEditing = (isEditing: boolean) => setLocal(prev => ({...prev, isEditing: isEditing}));

    // 初始化随机排序的选项
    useEffect(() => {
        const choices = [
            { key: 'choise_a', content: note.choise_a },
            { key: 'choise_b', content: note.choise_b },
            { key: 'choise_c', content: note.choise_c },
            { key: 'choise_d', content: note.choise_d }
        ];
        
        // Fisher-Yates 洗牌算法
        const shuffled = [...choices];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        setLocal(prev => ({...prev, shuffledChoices: shuffled}));
    }, [note]);

    // 处理答案选择
    const handleAnswerChange = (choiceKey) => {
        setLocal(prev => {
            const currentAnswer = prev.answers[note.id];
            // 如果点击的是已选中的选项，则取消选择
            if (currentAnswer === choiceKey) {
                const newAnswers = { ...prev.answers };
                delete newAnswers[note.id];
                return {
                    ...prev,
                    answers: newAnswers
                };
            }
            // 否则选择新的选项
            return {
                ...prev,
                answers: {
                    ...prev.answers,
                    [note.id]: choiceKey
                }
            };
        });
    };


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
                <div className='options'>
                    {local.shuffledChoices.map((choice, index) => {
                        const isSelected = local.answers[note.id] === choice.key;
                        return (
                            <div 
                                key={choice.key}
                                className={`choice-option ${
                                    isSelected 
                                        ? 'choice-selected' 
                                        : 'choice-unselected'
                                }`}
                                onClick={() => handleAnswerChange(choice.key)}
                                style={{
                                    border: '1px solid rgb(120, 210, 120)',
                                    backgroundColor: isSelected 
                                        ? 'rgb(120, 210, 120)' 
                                        : 'rgba(120, 210, 120, 0.15)',
                                    color: isSelected ? 'black' : 'rgb(120, 210, 120)',
                                    padding: '12px 16px',
                                    margin: '8px 0',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                            >
                                <input
                                    type="radio"
                                    name={`question-${note.id}`}
                                    value={choice.key}
                                    checked={isSelected}
                                    onChange={() => handleAnswerChange(choice.key)}
                                    style={{
                                        display: 'none'
                                    }}
                                />
                                <div dangerouslySetInnerHTML={{__html: choice.content}}></div>
                            </div>
                        );
                    })}
                </div>

                <div className='answer' dangerouslySetInnerHTML={{__html: note.answer}}></div>
                <div dangerouslySetInnerHTML={{__html: note.question}}></div>
                  

                <div className="operation">
                    <Button className={'border bg-background text-primary hover:bg-muted active:translate-y-[1px] active:translate-x-[1px] transition-transform'}
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
