import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { InputFieldProps } from './types';

type DateValue = string | Date | null;

export function DateField<T extends string = string>({
    name,
    label,
    value,
    onChange,
    error,
    required = false,
    placeholder = 'Select date',
    className = '',
    disabled = false,
    icon: Icon,
}: InputFieldProps<T>) {
    // Normalize value for flatpickr
    const dateValue = React.useMemo<Date | undefined>(() => {
        if (!value) return undefined;

        if (value instanceof Date) return value;

        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? undefined : parsed;
    }, [value]);

    const handleChange = (dates: Date[]) => {
        const selected = dates?.[0] ?? null;

        // Convert to Y-m-d format (Laravel friendly)
        const formatted = selected ? selected.toISOString().split('T')[0] : '';

        onChange(name as T, formatted);
    };

    return (
        <div className={cn('space-y-1.5', className)}>
            <Label
                htmlFor={name}
                className={cn(
                    'flex items-center gap-1 text-xs font-medium text-muted-foreground',
                    {
                        'after:ml-1 after:text-red-500 after:content-["*"]':
                            required,
                    },
                )}
            >
                {label}
                {Icon && <Icon className="h-3 w-3" />}
            </Label>

            <div className="relative">
                {Icon && (
                    <Icon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}

                <Flatpickr
                    value={dateValue}
                    onChange={handleChange}
                    options={{
                        dateFormat: 'Y-m-d',
                        allowInput: true,
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm transition-colors',
                        'focus-visible:ring-1 focus-visible:outline-none',
                        Icon && 'pl-10',
                        error
                            ? 'border-destructive focus-visible:ring-destructive'
                            : 'focus-visible:ring-ring',
                    )}
                />
            </div>

            {error && <p className="px-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}
