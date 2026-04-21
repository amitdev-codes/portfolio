import { useForm, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store, update } from '@/routes/admin/permissions';

type Permission = {
    id: number;
    name: string;
    created_at: string;
};

interface PermissionFormProps {
    permission?: Permission | null;
    onClose: () => void;
    isEditMode?: boolean;
}

export default function PermissionForm({
    permission,
    onClose,
    isEditMode = false,
}: PermissionFormProps) {
    const initialData = permission ? { name: permission.name } : { name: '' };
    const { data, setData, processing, errors, reset } = useForm(initialData);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    isEditMode
                        ? 'Permission updated successfully!'
                        : 'Permission created successfully!',
                );

                reset(); // clear form
                onClose(); // close modal
            },
            onError: () => {
                toast.error(isEditMode ? 'Update failed' : 'Create failed');
            },
        };

        if (isEditMode && permission) {
            router.put(update(permission.id), data, options);
        } else {
            router.post(store(), data, options);
        }
    }

    const buttonText = processing
        ? 'Saving…'
        : isEditMode
          ? 'Save Changes'
          : 'Create Permission';

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
                <Label
                    htmlFor="permission-name"
                    className="text-sm font-medium"
                >
                    Permission Name <span className="text-destructive">*</span>
                </Label>
                <Input
                    id="permission-name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. users, posts…"
                    autoFocus
                    className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                )}
            </div>

            <DialogFooter className="gap-2 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button type="submit" size="sm" disabled={processing}>
                    {buttonText}
                </Button>
            </DialogFooter>
        </form>
    );
}
