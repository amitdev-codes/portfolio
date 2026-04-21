import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { cn } from '@/lib/utils';

interface TextareaFieldProps<T extends string = string> {
    name: T;
    label: string;
    value: string;
    onChange: (name: T, value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    className?: string;
}

export function TextareaField<T extends string>({
    name,
    label,
    value,
    onChange,
    error,
    required = false,
    placeholder = '',
    rows = 4,
    disabled = false,
    className = '',
}: TextareaFieldProps<T>) {
    return (
        <div className={cn('space-y-1.5', className)}>
            <Label
                htmlFor={name}
                className={cn(
                    'block text-xs font-medium text-muted-foreground',
                    {
                        'after:ml-1 after:text-red-500 after:content-["*"]':
                            required,
                    },
                )}
            >
                {label}
            </Label>
            <Textarea
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                className={cn(
                    'resize-vertical min-h-20 w-full',
                    error
                        ? 'border-destructive focus-visible:ring-destructive'
                        : 'focus-visible:ring-ring',
                )}
            />
            {error && <p className="px-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}
