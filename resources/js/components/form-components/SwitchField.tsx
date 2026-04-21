import { X } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { SwitchFieldProps } from './types';

export function SwitchField<T extends string = string>({
    name,
    label,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
    description,
}: SwitchFieldProps<T>) {



    return (
        <div className={cn('space-y-1.5', className)}>
            <div className="flex items-center justify-between">
                <div>
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
                    {description && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
                <Switch
                    id={name}
                    checked={!!value}
                    onCheckedChange={(checked) => onChange(name, checked)}
                    disabled={disabled}
                    className={cn(
                        error &&
                            'data-[state=checked]:bg-destructive data-[state=unchecked]:border-destructive',
                    )}
                />
            </div>
            {error && (
                <p className="flex items-center gap-1 px-1 text-xs text-destructive">
                    <X className="h-3 w-3" />
                    {error}
                </p>
            )}
        </div>
    );
}
