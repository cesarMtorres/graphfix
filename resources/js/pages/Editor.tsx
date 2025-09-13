'use client';

import CodeEditor from '@/components/editor/CodeEditor';
import { VariablesPanel } from '@/components/editor/variables-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bug, Play, RotateCcw, Square, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function DebugIDE() {
    const [selectedFunction, setSelectedFunction] = useState('calculateSum');
    const [testArgs, setTestArgs] = useState('[15, 33]');
    const [isRunning, setIsRunning] = useState(false);

    const [variables, setVariables] = useState({
        a: 15,
        b: 33,
        c: 45.0,
    });

    const [logs, setLogs] = useState<string[]>([]);

    const runIsolatedFunction = () => {
        setIsRunning(true);
        setLogs([]);

        try {
            // Simular ejecución de función PHP aislada
            const args = JSON.parse(testArgs);

            // Simular ejecución paso a paso
            setTimeout(() => {
                setVariables({ a: args[0], b: args[1], c: 45.0 });
                setLogs((prev) => [...prev, `Calculando suma: ${args[0]} + ${args[1]} = ${args[0] + args[1]}`]);

                setTimeout(() => {
                    const result = args[0] + args[1];
                    setLogs((prev) => [...prev, `Resultado obtenido: ${result}`]);
                    setIsRunning(false);
                }, 1000);
            }, 500);
        } catch (error) {
            setLogs((prev) => [...prev, `Error: ${error}`]);
            setIsRunning(false);
        }
    };

    const stopExecution = () => {
        setIsRunning(false);
        setLogs((prev) => [...prev, 'Ejecución detenida']);
    };

    const resetState = () => {
        setVariables({
            a: 15,
            b: 33,
            c: 45.0,
        });
        setLogs([]);
        setIsRunning(false);
    };

    return (
        <div className="min-h-screen bg-black font-mono text-white">
            {/* Header */}
            <header className="border-b border-gray-600 bg-gray-800 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Bug className="h-6 w-6 text-blue-400" />
                            <h1 className="text-xl font-bold">GraphFix</h1>
                        </div>
                        <span className="rounded border border-blue-600 bg-blue-700 px-3 py-1 text-sm text-white">Función Aislada</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button onClick={runIsolatedFunction} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
                            <Play className="mr-2 h-4 w-4" />
                            {isRunning ? 'Ejecutando...' : 'Ejecutar'}
                        </Button>
                        <Button onClick={stopExecution} disabled={!isRunning} className="bg-red-600 hover:bg-red-700" size="sm">
                            <Square className="h-4 w-4" />
                        </Button>
                        <Button onClick={resetState} className="bg-gray-600 hover:bg-gray-700" size="sm">
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-73px)]">
                {/* Panel Izquierdo - Variables y Resultados */}
                <div className="flex w-1/3 flex-col border-r border-gray-600 bg-gray-800">
                    <div className="p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-green-400" />
                            <h2 className="text-lg font-semibold">Variables</h2>
                        </div>
                        <VariablesPanel variables={variables} />
                    </div>

                    {/* Function Selector */}
                    <div className="border-t border-gray-600 p-4">
                        <label className="mb-2 block text-sm font-medium text-gray-300">Función a probar:</label>
                        <select
                            value={selectedFunction}
                            onChange={(e) => setSelectedFunction(e.target.value)}
                            className="w-full rounded border border-gray-500 bg-gray-700 p-2 text-sm text-white"
                        >
                            <option value="calculateSum">calculateSum</option>
                            <option value="processArray">processArray</option>
                        </select>

                        <label className="mt-3 mb-2 block text-sm font-medium text-gray-300">Argumentos (JSON):</label>
                        <Input
                            type="textarea"
                            value={testArgs}
                            onChange={(e) => setTestArgs(e.target.value)}
                            className="w-full border-gray-500 bg-gray-700 font-mono text-sm text-white"
                            placeholder="[15, 33]"
                        />
                    </div>
                </div>

                {/* Panel Derecho - Editor de Código */}
                <div className="flex-1 bg-black">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-gray-600 p-4">
                            <h2 className="text-lg font-semibold">Editor de Código</h2>
                            <span className="rounded border border-purple-600 bg-purple-700 px-3 py-1 text-xs text-white">PHP</span>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            {/* <CodeEditor code={code} onChange={setCode} selectedFunction={selectedFunction} /> */}
                            <CodeEditor />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
