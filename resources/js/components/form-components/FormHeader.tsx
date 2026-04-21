import { Head } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormHeaderProps {
    modelName: string;
    model?: { id?: number; [key: string]: any };
    title?: string;
    children?: ReactNode;
}

export function FormHeader({
    modelName,
    model,
    title,
    children,
}: FormHeaderProps) {
    const isEdit = Boolean(model);

    const displayTitle =
        title || (isEdit ? `Edit ${modelName}` : `Create ${modelName}`);

    return (
        <>
            <Head title={displayTitle} />

            <CardHeader className="border-b border-border px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                    {/* LEFT SECTION */}
                    <div className="flex items-center gap-2.5">
                        <div
                            className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br',
                                isEdit
                                    ? 'from-blue-500 to-blue-600'
                                    : 'from-emerald-500 to-emerald-600',
                            )}
                        >
                            {isEdit ? (
                                <Pencil className="h-4 w-4 text-white" />
                            ) : (
                                <Plus className="h-4 w-4 text-white" />
                            )}
                        </div>

                        <div className="leading-tight">
                            <h1 className="text-base font-semibold tracking-tight">
                                {displayTitle}
                            </h1>
                        </div>
                    </div>

                    {/* RIGHT ACTION SLOT */}
                    {children}
                </div>
            </CardHeader>
        </>
    );
}
