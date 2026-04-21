import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { InputFieldProps } from './types';

export function InputField<T extends string = string>({
                                                          name,
                                                          label,
                                                          value,
                                                          onChange,
                                                          error,
                                                          required = false,
                                                          placeholder = '',
                                                          type = 'text',
                                                          className = '',
                                                          disabled = false,
                                                          icon: Icon,
                                                      }: InputFieldProps<T>) {
    // Convert value to string safely for the input element
    const inputValue = React.useMemo(() => {
        if (value == null) {
            return '';
        }

        if (typeof value === 'boolean') {
            return value ? 'true' : '';
        }

        if (value instanceof File) {
            return '';
        }

        return String(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(name as T, newValue);
    };

    return (
        <div className={cn('space-y-1.5', className)}>
            <Label
                htmlFor={name}
                className={cn(
                    'flex items-center gap-1 text-xs font-medium text-muted-foreground',
                    {
                        'after:ml-1 after:text-red-500 after:content-["*"]': required,
                    }
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
                    type={type}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'w-full',
                        Icon && 'pl-10',
                        error
                            ? 'border-destructive focus-visible:ring-destructive'
                            : 'focus-visible:ring-ring'
                    )}
                />
            </div>

            {error && <p className="px-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}
