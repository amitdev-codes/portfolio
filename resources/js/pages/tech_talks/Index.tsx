import { Head} from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import { create, destroy, edit, show } from '@/routes/admin/tech-talks';

interface TechTalk {
    id: number;
    category: string;
    category_color: string;
    excerpt: string;
    date: string;
    read_time: string;
    sort_order: number;
    video_link: string;
    source_link: string;
    is_published: boolean;
    slug: string;
    created_at: string;
    updated_at: string;
}

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
            key: 'id',
            header: 'ID',
            size: 56,
            sortable: true,
            filterable: false,
            muted: true,
        },
        {
            key: 'category',
            header: 'Category',
            sortable: false,
            filterable: false,
        },
        {
            key: 'category_color',
            header: 'Category Color',
            sortable: false,
            filterable: false,
        },
        {
            key: 'excerpt',
            header: 'Excerpt',
            sortable: false,
            filterable: false,
        },
        {
            key: 'date',
            header: 'Date',
            sortable: false,
            filterable: false,
        },
        {
            key: 'read_time',
            header: 'Read Time',
            sortable: false,
            filterable: false,
        },
        {
            key: 'video_link',
            header: 'Video Link',
            sortable: false,
            filterable: false,
        },
        {
            key: 'source_link',
            header: 'Source Link',
            sortable: false,
            filterable: false,
        },
        {
            key: 'is_published',
            header: 'Is Published',
            sortable: false,
            filterable: false,
        },
        {
            key: 'slug',
            header: 'Slug',
            sortable: false,
            filterable: false,
        },

        {
            key: 'sort_order',
            header: 'Sort Order',
            sortable: true,
            filterable: false,
        },
        {
            key: 'created_at',
            header: 'Joined',
            size: 130,
            sortable: false,
            filterable: false,
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
                    title="List Tech talks"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
