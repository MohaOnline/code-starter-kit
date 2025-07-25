"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { HTMLArea } from "@/app/lib/components/HTMLArea";
import { NotebookCombobox } from "./components/NotebookCombobox";
import { TypeCombobox } from "./components/TypeCombobox";
import { PreviewArea } from "./components/PreviewArea";
import ModeToggle from "@/components/mode-toggle";
import { ProcessingMask } from "@/app/lib/components/ProcessingMask";
import { useStatus } from "@/app/lib/atoms";
import { ThemeToggle } from "@/app/lib/components/ThemeToggle";
import HTMLAreaV2 from "@/app/lib/components/HTMLAreaV2";
import NavTop from "@/app/lib/components/NavTop";
import { preprocessText } from "@/app/api/notebooks/notes/crud/route";

interface NoteData {
  id?: number;
  nbid?: number;
  tid?: number;
  title?: string;
  body?: string;
  question?: string;
  answer?: string;
  figures?: string;
  body_script?: string;
  body_extra?: string;
  note?: string;
  note_extra?: string;
  deleted?: boolean;
  created?: string;
  weight?: string;
}

interface NotebookOption {
  id: number;
  title: string;
  title_sub: string;
}

interface TypeOption {
  id: number;
  title: string;
  title_sub: string;
}

export default function NotebookEditor() {
  const [noteId, setNoteId] = useState<string>("");
  const [noteData, setNoteData] = useState<NoteData>({});
  const [notebooks, setNotebooks] = useState<NotebookOption[]>([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useStatus();

  // Load options on component mount
  useEffect(() => {
    loadNotebooks();
    loadTypes();
  }, []);

  // Add keyboard shortcut listener for Cmd+S / Ctrl+S
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        saveNote();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [noteData, saving]); // Dependencies to ensure saveNote has latest state

  const loadNotebooks = async () => {
    try {
      const response = await fetch("/api/notebooks/editor/options/notebooks");
      const result = await response.json();
      if (result.success) {
        setNotebooks(result.data);
      }
    } catch (error) {
      console.error("Failed to load notebooks:", error);
      toast.error("Failed to load notebooks");
    }
  };

  const loadTypes = async () => {
    try {
      const response = await fetch("/api/notebooks/editor/options/types");
      const result = await response.json();
      if (result.success) {
        setTypes(result.data);
      }
    } catch (error) {
      console.error("Failed to load types:", error);
      toast.error("Failed to load types");
    }
  };

  const fetchNote = async () => {
    if (!noteId.trim()) {
      toast.error("Please enter a note ID");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/notebooks/editor/${noteId}`);
      const result = await response.json();

      if (result.success) {
        setNoteData(result.data);
        toast.success("Note loaded successfully");
      } else {
        toast.error(result.error || "Note not found");
        setNoteData({});
      }
    } catch (error) {
      console.error("Failed to fetch note:", error);
      toast.error("Failed to fetch note");
      setNoteData({});
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    setSaving(true);
    setStatus(prev => ({ ...prev, isProcessing: true }));

    console.log(preprocessText(noteData.body));

    try {
      const url = noteData.id ? `/api/notebooks/editor/${noteData.id}` : "/api/notebooks/editor";

      const method = noteData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      const result = await response.json();

      if (result.success) {
        if (!noteData.id && result.data?.id) {
          // New note created, update the ID
          setNoteData(prev => ({ ...prev, id: result.data.id }));
          setNoteId(result.data.id.toString());
        }
        toast.success(noteData.id ? "Note updated successfully" : "Note created successfully");
      } else {
        toast.error(result.error || "Failed to save note");
      }
    } catch (error) {
      console.error("Failed to save note:", error);
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
      setStatus(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleFieldChange = (field: keyof NoteData) => (e: any) => {
    const value = e.target ? e.target.value : e;
    setNoteData(prev => ({ ...prev, [field]: value }));
  };

  const handleHTMLAreaChange = (field: keyof NoteData) => (e: any) => {
    const value = e.target.value;
    setNoteData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <NavTop />
      <ProcessingMask />
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Notebook Editor</h1>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Editor */}
            <div className="space-y-6">
              {/* ID Input Section */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="noteId">Note ID</Label>
                    <Input
                      id="noteId"
                      value={noteId}
                      onChange={e => setNoteId(e.target.value)}
                      placeholder="Enter note ID to load existing note"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={fetchNote} disabled={loading}>
                      {loading ? "Loading..." : "Fetch"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
                {/* Notebook Selection */}
                <div>
                  <Label>Notebook</Label>
                  <NotebookCombobox notebooks={notebooks} value={noteData.nbid} onChange={handleFieldChange("nbid")} />
                </div>

                {/* Type Selection */}
                <div>
                  <Label>Type</Label>
                  <TypeCombobox types={types} value={noteData.tid} onChange={handleFieldChange("tid")} />
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={noteData.title || ""}
                    onChange={handleFieldChange("title")}
                    placeholder="Enter title"
                  />
                </div>

                {/* HTML Content Fields */}
                <div>
                  <Label>Body</Label>
                  <HTMLAreaV2 value={noteData.body || ""} handleNoteChange={handleHTMLAreaChange("body")} name="body" />
                </div>

                <div>
                  <Label>Question</Label>
                  <HTMLArea
                    value={noteData.question || ""}
                    handleNoteChange={handleHTMLAreaChange("question")}
                    name="question"
                    height="150px"
                  />
                </div>

                <div>
                  <Label>Answer</Label>
                  <HTMLArea
                    value={noteData.answer || ""}
                    handleNoteChange={handleHTMLAreaChange("answer")}
                    name="answer"
                    height="150px"
                  />
                </div>

                <div>
                  <Label>Figures</Label>
                  <HTMLArea
                    value={noteData.figures || ""}
                    handleNoteChange={handleHTMLAreaChange("figures")}
                    name="figures"
                    height="150px"
                  />
                </div>

                <div>
                  <Label>Body Script</Label>
                  <HTMLArea
                    value={noteData.body_script || ""}
                    handleNoteChange={handleHTMLAreaChange("body_script")}
                    name="body_script"
                    height="150px"
                  />
                </div>

                <div>
                  <Label>Body Extra</Label>
                  <HTMLArea
                    value={noteData.body_extra || ""}
                    handleNoteChange={handleHTMLAreaChange("body_extra")}
                    name="body_extra"
                    height="150px"
                  />
                </div>

                <div>
                  <Label>Note</Label>
                  <HTMLArea
                    value={noteData.note || ""}
                    handleNoteChange={handleHTMLAreaChange("note")}
                    name="note"
                    height="150px"
                  />
                </div>

                <div>
                  <Label>Note Extra</Label>
                  <HTMLArea
                    value={noteData.note_extra || ""}
                    handleNoteChange={handleHTMLAreaChange("note_extra")}
                    name="note_extra"
                    height="150px"
                  />
                </div>

                {/* Deleted Switch */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="deleted"
                    checked={noteData.deleted || false}
                    onCheckedChange={handleFieldChange("deleted")}
                  />
                  <Label htmlFor="deleted">Deleted</Label>
                </div>

                {/* Read-only fields */}
                {noteData.created && (
                  <div>
                    <Label>Created</Label>
                    <Input value={noteData.created} readOnly className="bg-gray-100" />
                  </div>
                )}

                {noteData.weight && (
                  <div>
                    <Label>Weight</Label>
                    <Input value={noteData.weight} readOnly className="bg-gray-100" />
                  </div>
                )}

                {/* Save Button */}
                <Button onClick={saveNote} disabled={saving} className="w-full">
                  {saving ? "Saving..." : noteData.id ? "Update Note" : "Create Note"}
                </Button>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <PreviewArea noteData={noteData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
