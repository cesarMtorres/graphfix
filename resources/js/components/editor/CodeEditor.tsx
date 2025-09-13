'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { ResultsPanel } from './results-panel';

export default function CodeEditor() {
    const [code, setCode] = useState("<?php\necho 'Hola Mundo!';");
    const [output, setOutput] = useState('');
    const [logs, setLogs] = useState<string[]>([]);

    const runCode = async () => {
        try {
            const response = await fetch('/api/run-php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ code }), // 🔹 mandamos el código
            });

            console.log('Response status:', response.status);

            const data = await response.json();
            setLogs((prev) => [...prev, data.output || data.error || 'Sin salida']);
            setOutput(data.output || data.error || 'Sin salida');
        } catch (e) {
            setOutput('Error al ejecutar el código');
        }
    };

    return (
        <div className="flex h-screen flex-col bg-gray-900">
            <div className="flex-1">
                <Editor height="100%" defaultLanguage="php" theme="vs-dark" value={code} onChange={(value) => setCode(value || '')} />
            </div>
            <button onClick={runCode} className="bg-blue-600 p-2 text-white hover:bg-blue-700">
                ▶ Run
            </button>
            <div className="h-80 overflow-auto bg-black p-4 text-green-400">
                <ResultsPanel logs={output} />
            </div>
        </div>
    );
}
