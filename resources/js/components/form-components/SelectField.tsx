import React from 'react';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SelectFieldProps } from './types';

export function SelectField({
    name,
    label,
    value,
    onChange,
    error,
    required = false,
    placeholder = 'Select...',
    options,
    className = '',
    disabled = false,
}: SelectFieldProps) {
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
            <Select
                value={value?.toString() || ''}
                onValueChange={(val) => onChange(name, val)}
                disabled={disabled}
            >
                <SelectTrigger
                    className={cn(
                        error
                            ? 'border-destructive focus:ring-destructive data-[state=open]:border-destructive'
                            : 'focus:ring-ring',
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="px-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}
