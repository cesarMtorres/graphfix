'use client';

import type React from 'react';
import { useRef } from 'react';

interface CodeEditorProps {
    code: string;
    onChange: (code: string) => void;
    selectedFunction: string;
}

export function CodeEditor({ code, onChange, selectedFunction }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const highlightSyntax = (code: string) => {
        return code
            .replace(
                /\b(function|if|else|elseif|for|foreach|while|return|echo|print|try|catch|throw|finally|class|public|private|protected|static|const|var|array|new|extends|implements)\b/g,
                '<span class="text-blue-400">$1</span>',
            )
            .replace(/'([^']*)'|"([^"]*)"/g, '<span class="text-green-400">\'$1$2\'</span>')
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>')
            .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500">$&</span>')
            .replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="text-yellow-300">$$1</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-purple-400">$1</span>(');
    };

    const getLineNumbers = () => {
        const lines = code.split('\n');
        return lines.map((_, index) => (
            <div key={index} className="pr-2 text-right text-gray-500 select-none">
                {index + 1}
            </div>
        ));
    };

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const lineNumbers = document.querySelector('.line-numbers');
        const highlightedCode = document.querySelector('.highlighted-code');

        if (lineNumbers && highlightedCode) {
            lineNumbers.scrollTop = e.currentTarget.scrollTop;
            highlightedCode.scrollTop = e.currentTarget.scrollTop;
        }
    };

    return (
        <div className="relative h-full bg-black">
            <div className="flex h-full">
                {/* Line Numbers */}
                <div className="line-numbers w-12 overflow-hidden border-r border-gray-600 bg-gray-800">
                    <div className="px-2 py-4 font-mono text-sm leading-6">{getLineNumbers()}</div>
                </div>

                {/* Code Area */}
                <div className="relative flex-1">
                    {/* Highlighted Code Background */}
                    <div
                        className="highlighted-code pointer-events-none absolute inset-0 overflow-auto p-4 font-mono text-sm leading-6 break-words whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
                    />

                    {/* Textarea for editing */}
                    <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => onChange(e.target.value)}
                        onScroll={handleScroll}
                        className="absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent p-4 font-mono text-sm leading-6 break-words whitespace-pre-wrap text-transparent caret-white outline-none"
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        data-gramm="false"
                    />
                </div>
            </div>

            {/* Function Highlight Indicator */}
            {selectedFunction && (
                <div className="absolute top-2 right-2 rounded border border-blue-600 bg-blue-700 px-3 py-1 text-xs text-white">
                    Probando: {selectedFunction}()
                </div>
            )}
        </div>
    );
}
