import { Head } from '@inertiajs/react';
import { Clock, MessageSquareText } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import { create, destroy, edit, show } from '@/routes/admin/tech-talks';

type TechTalk = {
    id: number;
    number: number;
    category: string;
    category_color: string;
    title: string;
    excerpt: string;
    date: string;
    read_time: string;
    sort_order: number;
    video_link: string | null;
    source_link: string | null;
    is_published: boolean;
    slug: string;
    created_at: string;
    updated_at: string;
};

interface PageProps {
    techTalks: TechTalk[];
    pagination?: {
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
        from: number | null;
        to: number | null;
    };
    filters?: { search?: string; filters?: Record<string, string> };
}

function formatDate(value?: string | null): string {
    if (!value) {
        return '—';
    }

    return value.includes('T') ? value.slice(0, 10) : value.slice(0, 10);
}

export default function TechTalkIndex({ techTalks }: PageProps) {
    const columns: ColumnConfig<TechTalk>[] = [
        {
            key: 'number',
            header: '#',
            size: 50,
            sortable: true,
            filterable: false,
            render: (value) => (
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
                    {String(value ?? 0).padStart(2, '0')}
                </span>
            ),
        },
        {
            key: 'title',
            header: 'Title',
            sortable: true,
            filterable: true,
            render: (_value, row) => (
                <div className="max-w-xs">
                    <p className="truncate font-medium text-slate-900 dark:text-white">
                        {row.title}
                    </p>
                    {row.excerpt && (
                        <p className="mt-0.5 line-clamp-1 truncate text-sm text-slate-500 dark:text-slate-400">
                            {row.excerpt}
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: 'category',
            header: 'Category',
            sortable: true,
            filterable: true,
            render: (_value, row) => (
                <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                        backgroundColor: `${row.category_color || '#64748b'}20`,
                        color: row.category_color || '#64748b',
                    }}
                >
                    {row.category}
                </span>
            ),
        },
        {
            key: 'date',
            header: 'Date',
            size: 120,
            sortable: true,
            filterable: false,
            render: (value) => (
                <span className="whitespace-nowrap text-sm tabular-nums text-slate-600 dark:text-slate-400">
                    {formatDate(value)}
                </span>
            ),
        },
        {
            key: 'read_time',
            header: 'Read Time',
            size: 90,
            sortable: false,
            filterable: false,
            render: (value) => (
                <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{value || '—'}</span>
                </div>
            ),
        },
        {
            key: 'is_published',
            header: 'Status',
            size: 100,
            sortable: true,
            filterable: true,
            render: (value) => (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        value
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                >
                    {value ? 'Published' : 'Draft'}
                </span>
            ),
        },
        {
            key: 'sort_order',
            header: 'Order',
            size: 70,
            sortable: true,
            filterable: false,
            render: (value) => (
                <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    {value ?? 0}
                </span>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb items={[{ label: 'Tech Talks', icon: MessageSquareText }]} />
            <Head title="Tech Talks" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={techTalks ?? []}
                    title="Tech Talks"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
