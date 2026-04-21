import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import {
    show,
    edit,
    create,
    destroy,
    bulkDestroy,
    exportMethod as exportUsers,
    exportMethod,
} from '@/routes/admin/users';

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    roles: string;
    created_at: string;
};

interface PageProps {
    users: User[];
    roles: string[];
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

export default function Index({
    users,
    roles,
    pagination,
    filters,
}: PageProps) {
    const columns: ColumnConfig<User>[] = [
        {
            key: 'id',
            header: 'ID',
            size: 56,
            sortable: true,
            filterable: false,
            muted: true,
        },
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'Search name…',
        },
        {
            key: 'email',
            header: 'Email',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'Search email…',
        },
        {
            key: 'roles',
            header: 'Roles',
            sortable: false,
            filterable: true,
            filterVariant: 'select',
            filterOptions: Object.values(roles).map((name) => ({
                label: name.charAt(0).toUpperCase() + name.slice(1),
                value: name,
            })),
            tags: true,
        },
        {
            key: 'email_verified_at',
            header: 'Verified',
            size: 90,
            sortable: true,
            filterable: false,
            badge: { truthy: '✓ Yes', falsy: 'No' },
        },
        {
            key: 'created_at',
            header: 'Joined',
            size: 130,
            sortable: true,
            filterable: false,
            muted: true,
        },
    ];

    return (
        <>
            <Breadcrumb items={[{ label: 'Users', icon: Users }]} />
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={users}
                    title="List Users"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                    bulkDestroyRoute={bulkDestroy}
                    pagination={pagination}
                    initialSearch={filters?.search ?? ''}
                    initialColumnFilters={filters?.filters ?? {}}
                    searchableColumns={['name', 'email', 'roles']}
                    exportRoutes={{
                        excel: exportMethod('excel'),
                        csv: exportMethod('csv'),
                        pdf: exportMethod('pdf'),
                    }}
                />
            </div>
        </>
    );
}
