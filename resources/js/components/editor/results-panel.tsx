'use client';

interface ResultsPanelProps {
    logs: string[];
}

export function ResultsPanel({ logs }: ResultsPanelProps) {
    return (
        <div className="h-40 overflow-y-auto rounded bg-gray-700 p-3">
            <div className="space-y-1">
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div key={index} className="rounded bg-black/50 p-2 font-mono text-xs text-gray-200">
                            <span className="mr-2 text-green-400">{'>'}</span>
                            {log}
                        </div>
                    ))
                ) : (
                    <div className="py-4 text-center text-xs text-gray-400 italic">No hay logs de consola</div>
                )}
            </div>
        </div>
    );
}
