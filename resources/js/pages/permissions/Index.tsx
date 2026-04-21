import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import type { ColumnConfig } from '@/components/DataTable';
import ModalDataTable from '@/components/ModalDataTable';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { bulkDestroy, destroy } from '@/routes/admin/permissions';
import PermissionForm from './PermissionForm'; // Import the common form

// ─── Types ────────────────────────────────────────────────────────────────────
type Permission = {
    id: number;
    name: string;
    created_at: string;
};

interface PageProps {
    permissions: Permission[];
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
function ShowPermission({
    permission,
    onClose,
}: {
    permission: Permission;
    onClose: () => void;
}) {
    return (
        <div className="flex flex-col gap-4 py-2">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                <dt className="font-medium text-muted-foreground">ID</dt>
                <dd className="tabular-nums">{permission.id}</dd>

                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd>{permission.name}</dd>

                <dt className="font-medium text-muted-foreground">Created</dt>
                <dd className="text-muted-foreground tabular-nums">
                    {permission.created_at}
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
export default function Index({ permissions, pagination, filters }: PageProps) {
    const columns: ColumnConfig<Permission>[] = [
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
            <Breadcrumb items={[{ label: 'Permissions', icon: Users }]} />
            <Head title="Permissions" />

            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <ModalDataTable
                    columnConfigs={columns}
                    data={permissions}
                    title="List Permissions"
                    useModal
                    createLabel="Add Permission"
                    renderCreateModal={(onClose) => (
                        <PermissionForm onClose={onClose} />
                    )}
                    renderEditModal={(permission, onClose) => (
                        <PermissionForm
                            permission={permission}
                            onClose={onClose}
                            isEditMode
                        />
                    )}
                    renderShowModal={(permission, onClose) => (
                        <ShowPermission
                            permission={permission}
                            onClose={onClose}
                        />
                    )}
                    destroyRoute={destroy}
                    bulkDestroyRoute={bulkDestroy}
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
