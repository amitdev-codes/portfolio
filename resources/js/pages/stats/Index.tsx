import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import { create, destroy, edit, show } from '@/routes/admin/stats';

type Stat= {
    id: number;
    value:string;
    icon:string;
    label:string;
    sort_order:number;
    created_at: string;
};

interface PageProps {
    stats: Stat[];
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

export default function Index({ stats }: PageProps) {

    const columns: ColumnConfig<Stat>[] = [
        {
            key: 'id',
            header: 'ID',
            size: 56,
            sortable: true,
            filterable: false,
            muted: true,
        },
        {
            key: 'value',
            header: 'Value',
            sortable: false,
            filterable: false,
        },
        {
            key: 'label',
            header: 'Label',
            sortable: false,
            filterable: false,
        },
        {
            key: 'icon',
            header: 'Icon',
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
            <Breadcrumb items={[{ label: 'Stats', icon: Users }]} />
            <Head title="Stats" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={stats ?? []}
                    title="List Stats"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
