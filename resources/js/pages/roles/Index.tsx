import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import type { ColumnConfig } from '@/components/DataTable';
import { destroy, create, edit, show } from '@/routes/admin/roles';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import DataTable from '@/components/DataTable';

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = {
    id: number;
    name: string;
    created_at: string;
};

interface PageProps {
    roles: Role[];
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

// ─── Show / View ──────────────────────────────────────────────────────────────
function ShowRole({ role, onClose }: { role: Role; onClose: () => void }) {
    return (
        <div className="flex flex-col gap-4 py-2">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                <dt className="font-medium text-muted-foreground">ID</dt>
                <dd className="tabular-nums">{role.id}</dd>

                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd>{role.name}</dd>

                <dt className="font-medium text-muted-foreground">Created</dt>
                <dd className="text-muted-foreground tabular-nums">
                    {role.created_at}
                </dd>
            </dl>

            <DialogFooter className="pt-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                    Close
                </Button>
            </DialogFooter>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index({ roles, pagination, filters }: PageProps) {
    const columns: ColumnConfig<Role>[] = [
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
            <Breadcrumb items={[{ label: 'Roles', icon: Users }]} />
            <Head title="Roles" />

            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    data={roles}
                    title="List Roles"
                    useModal
                    createLabel="Add Role"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                    pagination={pagination}
                    initialSearch={filters?.search ?? ''}
                    initialColumnFilters={filters?.filters ?? {}}
                    searchableColumns={['name']}
                    exportRoutes={{}}
                />
            </div>
        </>
    );
}
