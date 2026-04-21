import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { DecimalFieldProps } from './types';

export function DecimalField({
    name,
    label,
    value,
    onChange,
    error,
    required = false,
    placeholder = '',
    min,
    max,
    step = '0.0001',
    decimals = 4,
    className = '',
    disabled = false,
    icon: Icon,
}: DecimalFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        // Ensure only valid decimal input
        if (val === '' || /^\d*\.?\d*$/.test(val)) {
            onChange(name, val);
        }
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
                <Input
                    id={name}
                    name={name}
                    type="number"
                    step={step}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    disabled={disabled}
                    className={cn(
                        'w-full',
                        Icon && 'pl-10',
                        error
                            ? 'border-destructive focus-visible:ring-destructive'
                            : 'focus-visible:ring-ring',
                    )}
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                    {decimals} decimals
                </span>
            </div>
            {error && <p className="px-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}
