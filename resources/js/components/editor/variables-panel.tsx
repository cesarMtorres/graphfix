'use client';

interface VariablesPanelProps {
    variables: Record<string, any>;
}

export function VariablesPanel({ variables }: VariablesPanelProps) {
    const getVariableType = (value: any) => {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        if (Number.isInteger(value)) return 'int';
        if (typeof value === 'number') return 'float';
        return typeof value;
    };

    const formatValue = (value: any) => {
        if (value === null) return 'null';
        if (Array.isArray(value)) return `[${value.join(', ')}]`;
        if (typeof value === 'string') return `"${value}"`;
        return String(value);
    };

    return (
        <div className="space-y-1">
            {Object.entries(variables).map(([name, value]) => {
                const type = getVariableType(value);
                return (
                    <div key={name} className="flex items-center justify-between rounded bg-gray-700 px-3 py-2 transition-colors hover:bg-gray-600">
                        <div className="flex items-center gap-2 font-mono text-sm">
                            <span className="text-blue-300">{name}</span>
                            <span className="text-gray-400">=</span>
                            <span className="text-green-300">{formatValue(value)}</span>
                        </div>
                        <span className="rounded bg-gray-600 px-2 py-1 text-xs text-orange-300">{type}</span>
                    </div>
                );
            })}

            {Object.keys(variables).length === 0 && (
                <div className="py-4 text-center text-gray-400">
                    <p className="text-sm">No hay variables en el scope actual</p>
                </div>
            )}
        </div>
    );
}
