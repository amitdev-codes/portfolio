import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import { create, destroy, edit, show } from '@/routes/admin/experiences';

type Experience = {
    id: number;
    role: string;
    description: string;
    company: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    company_website: string;
    company_logo: string;
    sort_order: number;
    created_at: string;
};

interface PageProps {
    experiences: Experience[];
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

export default function Index({ experiences }: PageProps) {
    const columns: ColumnConfig<Experience>[] = [
        {
            key: 'id',
            header: 'ID',
            size: 56,
            sortable: true,
            filterable: false,
            muted: true,
        },
        {
            key: 'role',
            header: 'Role',
            sortable: false,
            filterable: false,
        },
        {
            key: 'description',
            header: 'Description',
            sortable: false,
            filterable: false,
        },
        {
            key: 'company',
            header: 'Company',
            sortable: false,
            filterable: false,
        },
        {
            key: 'start_date',
            header: 'Start Date',
            sortable: false,
            filterable: false,
        },
        {
            key: 'end_date',
            header: 'End Date',
            sortable: false,
            filterable: false,
        },
        {
            key: 'is_current',
            header: 'Is Current',
            sortable: false,
            filterable: false,
        },
        {
            key: 'company_logo',
            header: 'Company Logo',
            sortable: false,
            filterable: false,
        },
        {
            key: 'company_website',
            header: 'Company Website',
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
            <Breadcrumb items={[{ label: 'Experiences', icon: Users }]} />
            <Head title="Experiences" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={experiences ?? []}
                    title="List Experiences"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
