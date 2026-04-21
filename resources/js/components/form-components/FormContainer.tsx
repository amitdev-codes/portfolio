// @/components/form-components/FormContainer.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
    mode: 'create' | 'edit';
    cancelAction: () => void;
}

export function FormContainer({
    title,
    children,
    onSubmit,
    processing,
    mode,
    cancelAction,
}: FormContainerProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-8">
            {children}
            <div className="flex flex-col justify-end gap-3 border-t border-border/50 bg-gradient-to-t from-background/50 pt-8 sm:flex-row">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={cancelAction}
                    disabled={processing}
                    className="w-full sm:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    size="lg"
                    disabled={processing}
                    className="w-full gap-2 px-8 font-semibold shadow-lg transition-all hover:shadow-xl sm:w-auto"
                >
                    {processing ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            {mode === 'edit'
                                ? 'Update Information'
                                : 'Create Information'}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
