import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ColorFieldProps<T extends string = string> {
    name: T;
    label: string;
    value: string;
    onChange: (name: T, value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function ColorField<T extends string = string>({
    name,
    label,
    value = '#000000',
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
}: ColorFieldProps<T>) {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        // ensure starts with #
        if (!val.startsWith('#')) {
            val = `#${val}`;
        }

        onChange(name, val);
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
            </Label>

            <div className="flex items-center gap-2">
                {/* Color Picker */}
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={handleColorChange}
                    disabled={disabled}
                    className="h-10 w-14 cursor-pointer rounded border"
                />

                {/* Hex Input */}
                <Input
                    id={name}
                    name={name}
                    type="text"
                    value={value || ''}
                    onChange={handleTextChange}
                    disabled={disabled}
                    placeholder="#000000"
                    className={cn(
                        'w-full',
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
