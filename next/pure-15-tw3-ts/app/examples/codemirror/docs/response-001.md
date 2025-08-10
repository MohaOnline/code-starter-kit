// File: app/tiptap-demo/page.tsx
"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Node, mergeAttributes } from "@tiptap/core";

const VoiceSpan = Node.create({
  name: "voiceSpan",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      "aria-label": { default: null },
      "data-voice-gender": { default: null },
      "data-voice-uuid": { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-voice-uuid]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { class: "voice-span" }),
      0,
    ];
  },
});

export default function TiptapDemo() {
  const [dialogData, setDialogData] = useState<any>(null);
  const [currentNode, setCurrentNode] = useState<any>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      VoiceSpan.extend({
        addNodeView() {
          return ({ node, getPos, editor }) => {
            const span = document.createElement("span");
            span.className = "voice-span";
            span.textContent = node.textContent;
            span.style.border = "1px dashed #aaa";
            span.style.padding = "2px 4px";
            span.style.margin = "2px";
            span.style.position = "relative";

            span.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("👆 Span clicked! 中文 Debug: span 属性如下:", node.attrs);
              setDialogData({
                ...node.attrs,
                content: node.textContent,
                getPos,
              });
              setCurrentNode({ node, getPos });
            });

            const playBtn = document.createElement("button");
            playBtn.textContent = "▶";
            playBtn.style.marginLeft = "4px";
            playBtn.onclick = (e) => {
              e.stopPropagation();
              console.log("🔊 Play audio for:", node.textContent);
            };

            const refreshBtn = document.createElement("button");
            refreshBtn.textContent = "⟳";
            refreshBtn.style.marginLeft = "4px";
            refreshBtn.onclick = (e) => {
              e.stopPropagation();
              console.log("🔁 Regenerate audio for:", node.textContent);
            };

            span.appendChild(playBtn);
            span.appendChild(refreshBtn);

            return {
              dom: span,
            };
          };
        },
      }),
    ],
    content: `
      <p>
        <span data-voice-gender="male" data-voice-uuid="123" aria-label="First">First content</span>
        <span data-voice-gender="female" data-voice-uuid="456" aria-label="Second">Second content</span>
        <span data-voice-gender="female" data-voice-uuid="789" aria-label="Third">Third content</span>
      </p>
      <div>
        <span class="image-wrapper">
          <img src="/img.png" alt="image" />
        </span>
      </div>
    `,
  });

  const saveChanges = () => {
    if (!dialogData || !editor) return;
    console.log("💾 Saving changes to node...", dialogData);
    editor.commands.command(({ tr }) => {
      tr.insertText(dialogData.content, dialogData.getPos + 1, dialogData.getPos + 1 + currentNode.node.nodeSize - 2);
      tr.setNodeMarkup(dialogData.getPos, undefined, {
        "aria-label": dialogData["aria-label"],
        "data-voice-gender": dialogData["data-voice-gender"],
        "data-voice-uuid": dialogData["data-voice-uuid"],
      });
      return true;
    });
    setDialogData(null);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">🎙️ Voice Span Editor Demo</h2>

      {editor && <EditorContent editor={editor} />}

      {dialogData && (
        <div className="p-4 border border-gray-400 bg-gray-100 mt-4">
          <h3>Edit Span Attributes</h3>
          <div className="space-y-2">
            <input
              className="border p-1 w-full"
              value={dialogData.content}
              onChange={(e) => setDialogData({ ...dialogData, content: e.target.value })}
              placeholder="Content"
            />
            <input
              className="border p-1 w-full"
              value={dialogData["aria-label"]}
              onChange={(e) => setDialogData({ ...dialogData, "aria-label": e.target.value })}
              placeholder="aria-label"
            />
            <input
              className="border p-1 w-full"
              value={dialogData["data-voice-gender"]}
              onChange={(e) => setDialogData({ ...dialogData, "data-voice-gender": e.target.value })}
              placeholder="data-voice-gender"
            />
            <input
              className="border p-1 w-full"
              value={dialogData["data-voice-uuid"]}
              onChange={(e) => setDialogData({ ...dialogData, "data-voice-uuid": e.target.value })}
              placeholder="data-voice-uuid"
            />
            <button className="bg-blue-500 text-white px-4 py-2" onClick={saveChanges}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
