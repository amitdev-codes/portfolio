type ChartItem = {
    name: string;
    value: number;
};

const COLORS = [
    '#2563eb',
    '#0d9488',
    '#ca8a04',
    '#dc2626',
    '#7c3aed',
    '#0891b2',
    '#65a30d',
    '#ea580c',
];

export default function BarChart({
    data,
    height = 180,
    emptyLabel = 'No data yet',
}: {
    data: ChartItem[];
    height?: number;
    emptyLabel?: string;
}) {
    const filtered = data.filter((item) => item.value > 0);
    const max = Math.max(...filtered.map((item) => item.value), 1);

    if (filtered.length === 0) {
        return (
            <div
                className="flex items-center justify-center text-sm text-muted-foreground"
                style={{ height }}
            >
                {emptyLabel}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div
                className="flex items-end gap-2 border-b border-border pb-2"
                style={{ height }}
            >
                {filtered.map((item, index) => {
                    const barHeight = Math.max((item.value / max) * (height - 28), 4);
                    return (
                        <div
                            key={item.name}
                            className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                        >
                            <span className="text-[10px] font-medium text-foreground">
                                {item.value.toLocaleString()}
                            </span>
                            <div
                                className="w-full max-w-10 rounded-t-md transition-all"
                                style={{
                                    height: barHeight,
                                    backgroundColor: COLORS[index % COLORS.length],
                                }}
                                title={`${item.name}: ${item.value}`}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex gap-2">
                {filtered.map((item) => (
                    <div
                        key={item.name}
                        className="flex-1 truncate text-center text-[10px] text-muted-foreground"
                        title={item.name}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
