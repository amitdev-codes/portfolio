import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface UnitInputFieldProps<T extends string = string> {
    name: T;
    label: string;
    value: number | string;
    onChange: (name: T, value: string) => void;
    unit: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function UnitInputField<T extends string = string>({
    name,
    label,
    value,
    onChange,
    unit,
    error,
    required,
    disabled,
    className,
}: UnitInputFieldProps<T>) {
    return (
        <div className={cn('space-y-1.5', className)}>
            <Label>{label}</Label>

            <div className="relative">
                <Input
                    type="number"
                    value={value ?? ''}
                    onChange={(e) => onChange(name, e.target.value)}
                    disabled={disabled}
                    className={cn(
                        'pr-12',
                        error
                            ? 'border-destructive focus-visible:ring-destructive'
                            : 'focus-visible:ring-ring',
                    )}
                />

                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                    {unit}
                </span>
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
