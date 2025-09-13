'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

interface Props {
    initialCode?: string;
}

export default function CodeEditor({ initialCode = "<?php\necho 'Hola Mundo!';" }: Props) {
    const [code, setCode] = useState(initialCode);

    return (
        <div className="h-screen bg-gray-900">
            <Editor
                height="100%"
                defaultLanguage="php"
                defaultValue={initialCode}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
            />
        </div>
    );
}
