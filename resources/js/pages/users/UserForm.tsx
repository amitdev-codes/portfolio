// resources/js/Pages/Users/UserForm.tsx
import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Pencil, Eye, EyeOff, Save, Users, UserPlus } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { create, update, store, index } from '@/routes/admin/users';

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

interface Props {
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
    } | null;
    roles: Record<string, string>;
}

const UserForm: React.FC<Props> = ({ user, roles }) => {
    const { data, setData, processing, errors } = useForm<FormData>({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        role: user?.role || '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            ...data,
            role: data.role ?? [],
        };

        if (user?.id) {
            router.put(update(user.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('User updated successfully!');
                },
                onError: () => {
                    toast.error('Update failed');
                },
            });
        } else {
            router.post(store(), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('User created successfully!');
                },
                onError: () => {
                    toast.error('Create failed');
                },
            });
        }
    };

    const breadcrumbItems = [
        { label: 'Users', href: index(), icon: Users },
        user
            ? { label: 'Update User', href: update(user.id), icon: Users }
            : { label: 'Create User', href: create(), icon: UserPlus },
    ];


    return (
        <>
            <Breadcrumb showHome items={breadcrumbItems} />

            <Head title={user ? `Edit ${user.name}` : 'Create User'} />

            <div className="p-4">
                <Card>
                    <CardHeader className="border-b border-border px-5 py-2">
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                className="pointer-events-none h-7 gap-1.5 px-3 text-xs"
                                tabIndex={-1}
                            >
                                {user ? (
                                    <>
                                        <Pencil className="h-3 w-3" />
                                        Edit User
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-3 w-3" />
                                        Create New User
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4">
                        <form onSubmit={submit}>
                            {/* ── Account Information ─────────────────────────── */}
                            <p className="mb-2.5 border-b border-border pb-1.5 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                                Account Information
                            </p>
                            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Full Name{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="John Doe"
                                        className={cn(
                                            errors.name && 'border-destructive',
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Email Address{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="john@example.com"
                                        className={cn(
                                            errors.email &&
                                                'border-destructive',
                                        )}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Role{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(v) =>
                                            setData('role', v)
                                        }
                                    >
                                        <SelectTrigger
                                            className={cn(
                                                'w-full',
                                                errors.role &&
                                                    'border-destructive',
                                            )}
                                        >
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel className="text-xs">
                                                    Roles
                                                </SelectLabel>
                                                {Object.entries(roles).map(
                                                    ([id, name]) => (
                                                        <SelectItem
                                                            key={id}
                                                            value={name}
                                                            className="text-xs"
                                                        >
                                                            {name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <p className="text-xs text-destructive">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ── Security ────────────────────────────────────── */}
                            <p className="mb-3 border-b border-border pb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                                Security
                            </p>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        {user ? 'New Password' : 'Password'}
                                        {!user && (
                                            <span className="ml-0.5 text-destructive">
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className={cn(
                                                'pr-10',
                                                errors.password &&
                                                    'border-destructive',
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-3.5 w-3.5" />
                                            ) : (
                                                <Eye className="h-3.5 w-3.5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-destructive">
                                            {errors.password}
                                        </p>
                                    )}
                                    {user && (
                                        <p className="text-xs text-muted-foreground">
                                            Leave blank to keep current password
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Confirm Password
                                        {!user && (
                                            <span className="ml-0.5 text-destructive">
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-3.5 w-3.5" />
                                            ) : (
                                                <Eye className="h-3.5 w-3.5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Min. 8 characters
                                    </p>
                                </div>
                            </div>

                            {/* ── Footer ──────────────────────────────────────── */}
                            <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={processing}
                                    className="gap-1.5 px-5"
                                >
                                    {processing ? (
                                        <>
                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-3.5 w-3.5" />
                                            {user
                                                ? 'Update User'
                                                : 'Create User'}
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(index())}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UserForm;
