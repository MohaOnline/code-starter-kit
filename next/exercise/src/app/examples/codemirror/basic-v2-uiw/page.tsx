'use client';
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ThemeToggle } from '@/app/lib/components/ThemeToggle';

export default function Page() {
  const [value, setValue] = useState("console.log('Hello, CodeMirror 6!')");
  return (
    <>
      <ThemeToggle />
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        <h2>CodeMirror 6 基础示例</h2>
        <CodeMirror
          value={value}
          height="200px"
          extensions={[javascript()]}
          onChange={setValue}
        />
      </div>
    </>
  );
}
