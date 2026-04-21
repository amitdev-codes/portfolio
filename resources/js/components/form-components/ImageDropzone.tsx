import { Image as ImageIcon, X, Plus } from 'lucide-react';
import React, { useState, useCallback, useEffect } from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { Dropzone, DropzoneContent } from '@/components/ui/dropzone';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps<T extends string = string> {
    name: T;
    label: string;
    value: File | File[] | null;
    onChange: (name: T, files: File | File[] | null) => void;
    error?: string;
    preview?: string | null;
    previews?: string[]; // Added for multiple images
    onPreviewChange?: (previews: string[]) => void; // Added callback
    aspectRatio?: 'square' | 'wide' | 'portrait';
    multiple?: boolean;
    maxFiles?: number;
    maxSizeMB?: number;
}

export function ImageDropzone<T extends string>({
    name,
    label,
    value,
    onChange,
    error,
    preview: externalPreview,
    previews: externalPreviews,
    onPreviewChange,
    aspectRatio = 'square',
    multiple = false,
    maxFiles = 10,
    maxSizeMB = 5,
}: ImageDropzoneProps<T>) {
    const [localPreview, setLocalPreview] = useState<string | null>(
        externalPreview || null,
    );
    const [localPreviews, setLocalPreviews] = useState<string[]>(
        externalPreviews || [],
    );

    // Sync external previews
    useEffect(() => {
        if (externalPreview) {
            setLocalPreview(externalPreview);
        }

        if (externalPreviews) {
            setLocalPreviews(externalPreviews);
        }
    }, [externalPreview, externalPreviews]);

    const handleDrop: NonNullable<DropzoneOptions['onDrop']> = useCallback(
        (acceptedFiles) => {
            const maxSize = maxSizeMB * 1024 * 1024;

            // Filter valid files
            const validFiles = acceptedFiles.filter(
                (file) => file.size <= maxSize,
            );

            if (validFiles.length === 0) {
                return;
            }

            if (!multiple) {
                // Single file mode
                const file = validFiles[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewUrl = e.target?.result as string;
                    setLocalPreview(previewUrl);
                    onChange(name, file);
                    onPreviewChange?.([previewUrl]);
                };
                reader.readAsDataURL(file);
            } else {
                // Multiple files mode
                const newPreviews: string[] = [];
                const readFile = (index: number) => {
                    if (index >= validFiles.length) {
                        // All files processed
                        setLocalPreviews((prev) => {
                            const updated = [...prev, ...newPreviews];
                            onPreviewChange?.(updated);

                            return updated;
                        });
                        onChange(name, validFiles);

                        return;
                    }

                    const file = validFiles[index];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        newPreviews.push(e.target?.result as string);
                        readFile(index + 1);
                    };
                    reader.readAsDataURL(file);
                };
                readFile(0);
            }
        },
        [multiple, maxSizeMB, name, onChange, onPreviewChange],
    );

    const removeImage = (index?: number) => {
        if (!multiple) {
            // Single image
            setLocalPreview(null);
            onChange(name, null);
            onPreviewChange?.([]);
        } else {
            // Multiple images
            setLocalPreviews((prev) => {
                const updated = prev.filter((_, i) => i !== index);
                onPreviewChange?.(updated);
                onChange(name, []); // Clear all or implement individual file tracking

                return updated;
            });
        }
    };

    const isWide = aspectRatio === 'wide';
    const isPortrait = aspectRatio === 'portrait';
    const hasImages = multiple ? localPreviews.length > 0 : !!localPreview;
    const currentFilesCount = multiple
        ? localPreviews.length
        : localPreview
          ? 1
          : 0;

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
                {label}
                {multiple && (
                    <span className="ml-2 text-xs text-muted-foreground">
                        ({currentFilesCount}/{maxFiles})
                    </span>
                )}
            </label>

            <Dropzone
                onDrop={handleDrop}
                maxFiles={multiple ? maxFiles : 1}
                multiple={multiple}
            >
                <DropzoneContent>
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                        {hasImages ? (
                            <div className="w-full space-y-3">
                                {/* Single Image Preview */}
                                {!multiple && localPreview && (
                                    <div className="group relative">
                                        <div
                                            className={cn(
                                                'mx-auto overflow-hidden rounded-xl border-2 border-border shadow-lg',
                                                isWide
                                                    ? 'aspect-video w-full'
                                                    : isPortrait
                                                      ? 'aspect-3/4 w-48'
                                                      : 'h-32 w-32',
                                            )}
                                        >
                                            <img
                                                src={localPreview}
                                                alt={`${label} preview`}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeImage()}
                                            className="absolute -top-2 -right-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:scale-110"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}

                                {/* Multiple Images Preview */}
                                {multiple && localPreviews.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                        {localPreviews.map((preview, index) => (
                                            <div
                                                key={index}
                                                className="group relative"
                                            >
                                                <div
                                                    className={cn(
                                                        'overflow-hidden rounded-lg border-2 border-border shadow-md',
                                                        isPortrait
                                                            ? 'aspect-3/4'
                                                            : 'aspect-square',
                                                    )}
                                                >
                                                    <img
                                                        src={preview}
                                                        alt={`${label} ${index + 1}`}
                                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute -top-1 -right-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:scale-110"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add More Button for Multiple */}
                                {multiple && currentFilesCount < maxFiles && (
                                    <div className="flex justify-center pt-4">
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add more images
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <ImageIcon className="mb-2 h-12 w-12 text-muted-foreground" />
                                <p className="mb-1 text-sm font-medium">
                                    {multiple
                                        ? 'Drag & drop images here'
                                        : 'Drag & drop image here'}
                                </p>
                                <p className="mb-4 text-xs text-muted-foreground">
                                    PNG, JPG up to {maxSizeMB}MB
                                    {multiple && ` (max ${maxFiles})`}
                                </p>
                            </>
                        )}
                    </div>
                </DropzoneContent>
            </Dropzone>

            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
