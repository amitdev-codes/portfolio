import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import {create,show,edit,destroy} from '@/routes/admin/projects';

type Project = {
    id: number;
    title: string;
    short_description: string;
    full_description: string;
    color: string;
    emoji: string;
    tech: string;
    accent: string;
    link: string;
    sort_order: string;
    created_at: string;
};

interface PageProps {
    projects: Project[];
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

export default function Index({ projects }: PageProps) {
    const columns: ColumnConfig<Project>[] = [
        {
            key: 'id',
            header: 'ID',
            size: 56,
            sortable: true,
            filterable: false,
            muted: true,
        },
        {
            key: 'title',
            header: 'Title',
            sortable: false,
            filterable: false,
        },
        {
            key: 'short_description',
            header: 'Short Description',
            sortable: false,
            filterable: false,
        },
        // {
        //     key: 'full_description',
        //     header: 'Full Description',
        //     sortable: false,
        //     filterable: false,
        // },
        {
            key: 'color',
            header: 'Color',
            sortable: false,
            filterable: false,
        },
        {
            key: 'emoji',
            header: 'Emoji',
            sortable: false,
            filterable: false,
        },
        {
            key: 'tech',
            header: 'Tech',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'Search email…',
        },
        {
            key: 'accent',
            header: 'Accent',
            sortable: false,
            filterable: false,
        },
        {
            key: 'link',
            header: 'Link',
            sortable: false,
            filterable: false,
        },
        {
            key: 'sort_order',
            header: 'Sort Order',
            sortable: false,
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
            <Breadcrumb items={[{ label: 'Projects', icon: Users }]} />
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={projects ?? []}
                    title="List Projects"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
