import { useForm, router, Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { create, index, store, update } from '@/routes/admin/roles';
import Breadcrumb from '@/components/Breadcrumb';
import { Pencil, Plus, Users, UserPlus } from 'lucide-react';

type Role = {
    id: number;
    name: string;
    permissions?: string[];
};

interface RoleFormProps {
    role?: Role | null;
    permissions: any[]; // string OR object safe
    onClose: () => void;
    isEditMode?: boolean;
}

export default function RoleForm({
    role,
    permissions,
    onClose,
    isEditMode = false,
}: RoleFormProps) {
    // ✅ Normalize + Group permissions
    const groupedPermissions = permissions.reduce((acc: any, perm: any) => {
        const permissionName = typeof perm === 'string' ? perm : perm.name;
        if (!permissionName) return acc;

        const [action, ...rest] = permissionName.split('-');
        const module = rest.join('-');

        if (!acc[module]) acc[module] = {};
        acc[module][action] = permissionName;

        return acc;
    }, {});

    // ✅ All permissions list
    const allPermissions = Object.values(groupedPermissions).flatMap(
        (actions: any) => Object.values(actions),
    );

    const { data, setData, processing, errors } = useForm({
        name: role?.name || '',
        permissions:
            role?.permissions?.map((p: any) =>
                typeof p === 'string' ? p : p.name,
            ) || [],
    });

    // =========================
    // TOGGLES
    // =========================

    const togglePermission = (permission: string) => {
        setData(
            'permissions',
            data.permissions.includes(permission)
                ? data.permissions.filter((p) => p !== permission)
                : [...data.permissions, permission],
        );
    };

    const toggleAll = (checked: boolean) => {
        setData('permissions', checked ? allPermissions : []);
    };

    const toggleModule = (moduleActions: any, checked: boolean) => {
        const modulePermissions = Object.values(moduleActions);

        if (checked) {
            setData('permissions', [
                ...new Set([...data.permissions, ...modulePermissions]),
            ]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((p) => !modulePermissions.includes(p)),
            );
        }
    };

    const isAllSelected =
        allPermissions.length > 0 &&
        allPermissions.every((p) => data.permissions.includes(p));

    // =========================
    // SUBMIT
    // =========================

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            name: data.name,
            permissions: data.permissions,
        };

        if (isEditMode && role) {
            router.put(update(role.id), payload, {
                preserveScroll: true,
                onSuccess: () => toast.success('Role updated successfully!'),
                onError: () => toast.error('Update failed'),
            });
        } else {
            router.post(store(), payload, {
                preserveScroll: true,
                onSuccess: () => toast.success('Role created successfully!'),
                onError: () => toast.error('Create failed'),
            });
        }
    }

    const buttonText = processing
        ? 'Saving…'
        : isEditMode
          ? 'Save Changes'
          : 'Create Role';

    const breadcrumbItems = [
        { label: 'Roles', href: index(), icon: Users },
        role
            ? { label: 'Update Role', href: update(role.id), icon: Users }
            : { label: 'Create Role', href: create(), icon: UserPlus },
    ];

    return (
        <>
            <Breadcrumb showHome items={breadcrumbItems} />
            <Head title={role ? `Edit ${role.name}` : 'Create Role'} />

            <div className="p-4">
                <Card>
                    <CardHeader className="border-b border-border px-5 py-2">
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                className="pointer-events-none h-7 gap-1.5 px-3 text-xs"
                                tabIndex={-1}
                            >
                                {role ? (
                                    <>
                                        <Pencil className="h-3 w-3" />
                                        Edit Role
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-3 w-3" />
                                        Create Role
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            {/* ROLE NAME */}
                            <div className="flex flex-col gap-1.5">
                                <Label>
                                    Role Name{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="e.g. Admin, Editor"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* PERMISSIONS */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <Label>Permissions</Label>

                                    {/* GLOBAL TOGGLE */}
                                    <div className="flex items-center gap-2 text-xs">
                                        <span>Select All</span>
                                        <Switch
                                            checked={isAllSelected}
                                            onCheckedChange={toggleAll}
                                        />
                                    </div>
                                </div>

                                <div className="mt-2 max-h-[420px] overflow-auto rounded-md border">
                                    <table className="w-full text-xs">
                                        <thead className="sticky top-0 bg-muted">
                                            <tr>
                                                <th className="p-2 text-left">
                                                    Module
                                                </th>
                                                <th className="p-2 text-center">
                                                    All
                                                </th>
                                                {[
                                                    'view',
                                                    'create',
                                                    'edit',
                                                    'delete',
                                                ].map((a) => (
                                                    <th
                                                        key={a}
                                                        className="p-2 text-center capitalize"
                                                    >
                                                        {a}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {Object.entries(
                                                groupedPermissions,
                                            ).map(([module, actions]: any) => {
                                                const modulePermissions =
                                                    Object.values(actions);

                                                const isModuleSelected =
                                                    modulePermissions.length >
                                                        0 &&
                                                    modulePermissions.every(
                                                        (p) =>
                                                            data.permissions.includes(
                                                                p,
                                                            ),
                                                    );

                                                return (
                                                    <tr
                                                        key={module}
                                                        className="border-t"
                                                    >
                                                        <td className="p-2 font-medium capitalize">
                                                            {module}
                                                        </td>

                                                        {/* MODULE SELECT ALL */}
                                                        <td className="text-center">
                                                            <Switch
                                                                checked={
                                                                    isModuleSelected
                                                                }
                                                                onCheckedChange={(
                                                                    checked,
                                                                ) =>
                                                                    toggleModule(
                                                                        actions,
                                                                        checked,
                                                                    )
                                                                }
                                                            />
                                                        </td>

                                                        {/* ACTION SWITCHES */}
                                                        {[
                                                            'view',
                                                            'create',
                                                            'edit',
                                                            'delete',
                                                        ].map((action) => {
                                                            const permission =
                                                                actions[action];

                                                            return (
                                                                <td
                                                                    key={action}
                                                                    className="text-center"
                                                                >
                                                                    {permission && (
                                                                        <Switch
                                                                            checked={data.permissions.includes(
                                                                                permission,
                                                                            )}
                                                                            onCheckedChange={() =>
                                                                                togglePermission(
                                                                                    permission,
                                                                                )
                                                                            }
                                                                        />
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <DialogFooter className="gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>

                                <Button type="submit" disabled={processing}>
                                    {buttonText}
                                </Button>
                            </DialogFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
