'use client';

interface ResultsPanelProps {
    logs: string;
}

export function ResultsPanel({ logs }: ResultsPanelProps) {
    return (
        <div className="overflow-y-auto rounded bg-gray-700 p-2">
            {logs ? (
                <div className="rounded bg-black/50 p-2 font-mono text-xs text-gray-200">
                    <span className="mr-2 text-green-400">{'>'}</span>
                    {logs}
                </div>
            ) : (
                <div className="py-4 text-center text-xs text-gray-400 italic">No hay logs de consola</div>
            )}
        </div>
    );
}
