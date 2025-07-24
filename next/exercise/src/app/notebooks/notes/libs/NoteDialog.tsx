"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { linter, lintGutter } from "@codemirror/lint";
import { htmlCompletionSource, htmlLanguage, html } from "@codemirror/lang-html";
import { syntaxTree } from "@codemirror/language";
import { autocompletion } from "@codemirror/autocomplete";
import { EditorView } from "@codemirror/view";
import { toast } from "react-toastify";

import { NoteTypeSelector } from "./NoteTypeSelector";
import { NoteListeningDialogForm } from "./NoteListeningDialog";

import { initStatusNote, useStatus } from "@/app/lib/atoms";

import "./Note.css";
import { NoteTranslationSentenceForm } from "./NoteTranslationSentence";

/**
 * 通过 note 来判断是添加还是编辑
 *
 * @param preOpenCallback 设置打开对话框前的回调函数
 * @returns JSX
 */
export function NoteDialog({ note = null, preOpenCallback = null }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useStatus(); // 检查对话框状态：添加、编辑

  // Load note types data.
  useEffect(() => {
    // 如果已经加载过，就不用再次加载了。
    if (!status.types || status.types.length === 0) {
      fetch("/api/notebooks/types/list")
        .then(res => res.json())
        .then(json => {
          setStatus(prev => ({
            ...prev,
            types: json.types,
          }));
        })
        .catch(err => {
          console.error("Fetch API error: /api/notebooks/types/list");
        });
    } else {
      console.log("status.types", status.types);
    }
  }, []);

  // console.log('NoteDialog', preOpenCallback);

  return (
    <Dialog
      open={open}
      onOpenChange={b => {
        if (!status.isProcessing) {
          // 只有在非 processing 时传入 false，设置 false，导致关闭对话框。
          setOpen(b);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(true);
            preOpenCallback?.();
          }}
        >
          {note ? "Edit" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] md:max-w-[1400px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Note</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>

        {/* 笔记类型选择 */}
        <div className="grid gap-4 overflow-y-auto flex-1 pr-2">
          <div className="grid gap-3">
            <NoteTypeSelector types={status.types} />
          </div>

          <NoteDialogFormItemRender />
        </div>

        <DialogFooter className="flex-shrink-0 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              console.log("save clicked");
              setStatus(prev => ({ ...prev, isProcessing: true }));

              let action = "create";
              if (status.note.id) {
                action = "update";
              }

              fetch("/api/notebooks/notes/crud", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  action: action,
                  note: status.note,
                }),
              })
                .then(res => res.json())
                .then(json => {
                  console.log("API Response:", json); // 更明确的日志标识

                  if (!json.success) {
                    toast.error("API Response: " + json.error);
                    return;
                  } else {
                    toast.success("Save success");
                  }

                  if (action === "create") {
                    setStatus(prev => {
                      const updatedState = {
                        ...prev,
                        notes: [
                          {
                            ...json.note,
                            type: json.note.type.title,
                            type_sub: json.note.type.title_sub,
                            tid: json.note.type.id,
                          },
                          ...prev.notes,
                        ],
                        note: { ...prev.note, ...json.note },
                      };

                      // 听力理解：对话
                      if (json.note?.type?.id === "11") {
                        updatedState.notesListeningDialog = {
                          ...prev.notesListeningDialog,
                          notes: [
                            {
                              ...json.note,
                              type: json.note.type.title,
                              type_sub: json.note.type.title_sub,
                              tid: json.note.type.id,
                            },
                            ...prev.notesListeningDialog.notes,
                          ],
                        };
                      }

                      return updatedState;
                    });
                  } else if (action === "update") {
                    // 听力理解：对话
                    console.log("==update", json.note?.type?.id);

                    if (json.note?.type?.id === "11") {
                      // 刷新听力列表
                      status.notesListeningDialog.notes = status.notesListeningDialog.notes.map(item => {
                        if (item.id === json.note.id) {
                          return {
                            ...json.note,
                            type: json.note.type.title,
                          };
                        }
                        return item;
                      });

                      console.log("==update", status.notesListeningDialog.notes);

                      // 刷新笔记列表
                      setStatus(prev => ({
                        ...prev,
                        note: {
                          ...prev.note,
                          ...json.note,
                        },
                        notesListeningDialog: {
                          ...prev.notesListeningDialog,
                          notes: status.notesListeningDialog.notes,
                        },
                      }));
                    }
                  }
                })
                .catch(err => {
                  console.error("Fetch API error: /api/notebooks/notes/crud");
                  toast.error("Save failed" + err.message);
                })
                .finally(() => {
                  // setOpen(false);
                  setStatus(prev => ({ ...prev, isProcessing: false }));
                });
            }}
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 *
 * @returns
 */
export const NoteDialogFormItemRender = ({}) => {
  const [status, setStatus] = useStatus(); // 自定义状态管理

  function handleNoteFormItemChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    console.log("handleNoteFormItemChange", e.target.name, e.target.value);

    setStatus(prev => ({
      ...prev,
      note: {
        ...prev.note,
        [e.target.name]: e.target.value,
      },
    }));
  }

  // 仅根据 note.type.id 来判断
  // 听力理解：对话（高中、四级？、六级？……）
  if (status.note?.type?.id === "11") {
    return NoteListeningDialogForm(handleNoteFormItemChange, status);
  }

  // 单句翻译
  if (status.note?.type?.id === "16") {
    return NoteTranslationSentenceForm(handleNoteFormItemChange, status);
  }

  // 普通笔记：IT

  return <></>;
};
