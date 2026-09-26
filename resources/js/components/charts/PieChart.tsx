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

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function describeSlice(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    return [
        'M',
        cx,
        cy,
        'L',
        start.x,
        start.y,
        'A',
        r,
        r,
        0,
        largeArc,
        0,
        end.x,
        end.y,
        'Z',
    ].join(' ');
}

export default function PieChart({
    data,
    size = 180,
    emptyLabel = 'No data yet',
}: {
    data: ChartItem[];
    size?: number;
    emptyLabel?: string;
}) {
    const filtered = data.filter((item) => item.value > 0);
    const total = filtered.reduce((sum, item) => sum + item.value, 0);
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 4;

    if (total === 0) {
        return (
            <div className="flex h-[180px] items-center justify-center text-sm text-muted-foreground">
                {emptyLabel}
            </div>
        );
    }

    let currentAngle = 0;
    const slices = filtered.map((item, index) => {
        const sweep = (item.value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + Math.max(sweep, 0.01);
        currentAngle += sweep;

        return {
            ...item,
            color: COLORS[index % COLORS.length],
            path:
                sweep >= 359.99
                    ? undefined
                    : describeSlice(cx, cy, radius, startAngle, endAngle),
            fullCircle: sweep >= 359.99,
        };
    });

    return (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
                {slices.map((slice) =>
                    slice.fullCircle ? (
                        <circle
                            key={slice.name}
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill={slice.color}
                        />
                    ) : (
                        <path key={slice.name} d={slice.path} fill={slice.color} />
                    ),
                )}
            </svg>

            <ul className="w-full space-y-2">
                {slices.map((slice) => (
                    <li key={slice.name} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <span
                                className="inline-block size-2.5 rounded-full"
                                style={{ backgroundColor: slice.color }}
                            />
                            {slice.name}
                        </span>
                        <span className="font-medium text-foreground">
                            {slice.value.toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
