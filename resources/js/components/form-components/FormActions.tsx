import { router } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RouteDefinition } from '@/wayfinder';

interface FormActionsProps {
    modelName: string;
    processing: boolean;
    modelId?: number;
    indexRoute: string | RouteDefinition<'get'>;
    cancelRoute?: string | RouteDefinition<'get'>;
}

export function FormActions({
    modelName,
    processing,
    modelId,
    indexRoute,
    cancelRoute = indexRoute,
}: FormActionsProps) {
    const handleCancel = () => {
        if (!processing) {
            router.get(cancelRoute);
        }
    };

    const actionLabel = modelId ? `Update ${modelName}` : `Create ${modelName}`;

    return (
        <div className="sticky bottom-0 z-10 flex flex-col justify-end gap-3 border-t border-border/50 bg-background/80 px-4 py-4 backdrop-blur sm:flex-row">
            <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={handleCancel}
                className="w-full sm:w-auto"
                disabled={processing}
            >
                Cancel
            </Button>

            <Button
                type="submit"
                size="lg"
                disabled={processing}
                aria-busy={processing}
                className="w-full gap-2 px-8 font-semibold shadow-md transition-all hover:shadow-lg sm:w-auto"
            >
                {processing ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving {modelName}...
                    </>
                ) : (
                    <>
                        <Save className="h-4 w-4" />
                        {actionLabel}
                    </>
                )}
            </Button>
        </div>
    );
}
