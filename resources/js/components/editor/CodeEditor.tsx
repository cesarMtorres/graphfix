'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

export default function CodeEditor() {
    const [code, setCode] = useState("<?php\necho 'Hola Mundo!';");
    const [output, setOutput] = useState('');

    const runCode = async () => {
        const response = await fetch('/run-php');
        const data = await response.json();
        setOutput(data.output || data.error);
    };

    return (
        <div className="flex h-screen flex-col bg-gray-900">
            <div className="flex-1">
                <Editor height="100%" defaultLanguage="php" theme="vs-dark" value={code} onChange={(value) => setCode(value || '')} />
            </div>
            <button onClick={runCode} className="bg-blue-600 p-2 text-white hover:bg-blue-700">
                ▶ Run
            </button>
            <div className="h-40 overflow-auto bg-black p-4 text-green-400">
                <pre>{output}</pre>
            </div>
        </div>
    );
}
