import { Phone } from 'lucide-react';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface NepalPhoneFieldProps<T extends string = string> {
    name: T;
    label: string;
    value: string;
    onChange: (name: T, value: string) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export function NepalPhoneField<T extends string>({
    name,
    label,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
}: NepalPhoneFieldProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // keep only digits
        let val = e.target.value.replace(/\D/g, '');

        // enforce max 10 digits
        if (val.length > 10) {
            val = val.slice(0, 10);
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
                <Phone className="h-3 w-3" />
            </Label>

            <div className="relative">
                <div className="absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-1 rounded-md border bg-background px-2 py-1">
                    <span className="text-xs font-medium">🇳🇵</span>
                    <span className="text-xs font-medium">+977</span>
                </div>

                <Input
                    id={name}
                    name={name}
                    type="tel"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder="980xxxxxxx"
                    maxLength={10}
                    inputMode="numeric"
                    className={cn(
                        'w-full pr-4 pl-24',
                        error
                            ? 'border-destructive focus-visible:ring-destructive'
                            : 'focus-visible:ring-ring',
                    )}
                />
            </div>

            {error && <p className="px-1 text-xs text-destructive">{error}</p>}

            {/* optional helper validation hint */}
            {value && value.length !== 10 && !error && (
                <p className="px-1 text-xs text-muted-foreground">
                    Phone number must be exactly 10 digits
                </p>
            )}
        </div>
    );
}
