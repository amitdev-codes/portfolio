import { Head } from '@inertiajs/react';
import { Users, Calendar, Clock, ExternalLink, Eye, Edit, Trash2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import { create, edit, show, destroy } from '@/routes/admin/tech-talks';

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

export default function TechTalkIndex({ techTalks }: PageProps) {

    const columns: ColumnConfig<TechTalk>[] = [
        {
            key: 'number',
            header: '#',
            size: 50,
            sortable: true,
            filterable: false,
            render: (row) => (
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {String(row.number).padStart(2, '0')}
                </span>
            ),
        },
        {
            key: 'title',
            header: 'Title',
            sortable: true,
            filterable: true,
            render: (row) => (
                <div className="max-w-xs">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{row.title}</p>
                    {row.excerpt && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate line-clamp-1 mt-0.5">
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
            render: (row) => (
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                        backgroundColor: `${row.category_color}20`,
                        color: row.category_color,
                    }}
                >
                    {row.category}
                </span>
            ),
        },
        {
            key: 'date',
            header: 'Date',
            size: 110,
            sortable: true,
            filterable: false,
            render: (row) => (
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{row.date}</span>
                </div>
            ),
        },
        {
            key: 'read_time',
            header: 'Read Time',
            size: 90,
            sortable: false,
            filterable: false,
            render: (row) => (
                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{row.read_time}</span>
                </div>
            ),
        },
        {
            key: 'is_published',
            header: 'Status',
            size: 100,
            sortable: true,
            filterable: true,
            render: (row) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.is_published
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                >
                    {row.is_published ? 'Published' : 'Draft'}
                </span>
            ),
        },
        {
            key: 'sort_order',
            header: 'Order',
            size: 70,
            sortable: true,
            filterable: false,
            render: (row) => (
                <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
                    {row.sort_order}
                </span>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            size: 140,
            sortable: false,
            filterable: false,
            render: (row) => (
                <div className="flex items-center gap-1.5">
                    <a
                        href={`/tech-talk-details/${row.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                        title="View Public"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link
                        href={show(row.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                        href={edit(row.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Link>
                    <form method="post" action={destroy(row.id)}>
                        <button
                            type="submit"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb items={[{ label: 'Tech Talks', icon: Users }]} />
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
