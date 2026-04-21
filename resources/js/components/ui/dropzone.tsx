import * as React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

type DropzoneProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDrop'
> &
    DropzoneOptions;

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
    ({ className, children, ...props }, ref) => {
        const dropzone = useDropzone({
            accept: {
                'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            },
            maxFiles: 1,
            maxSize: 5 * 1024 * 1024,
            ...props,
        });

        const {
            getRootProps,
            getInputProps,
            isDragAccept,
            isDragReject,
            isDragActive,
        } = dropzone;

        return (
            <div
                ref={ref}
                {...getRootProps()}
                className={cn(
                    'group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground bg-background p-8 text-center transition-colors hover:border-primary hover:bg-muted/25 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    isDragAccept && 'border-emerald-500 bg-emerald-50/50',
                    isDragReject && 'border-destructive bg-destructive/10',
                    isDragActive &&
                    'border-primary/80 bg-primary/5 ring-2 ring-primary/20 ring-offset-2',
                    className,
                )}
            >
                <input {...getInputProps()} />
                {children}
            </div>
        );
    },
);

Dropzone.displayName = 'Dropzone';

const DropzoneContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col items-center gap-2', className)}
        {...props}
    >
        {children}
    </div>
));

DropzoneContent.displayName = 'DropzoneContent';

const DropzoneTrigger = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground',
            className,
        )}
        {...props}
    >
        {children}
    </div>
));

DropzoneTrigger.displayName = 'DropzoneTrigger';

export { Dropzone, DropzoneContent, DropzoneTrigger };
