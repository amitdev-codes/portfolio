import type { LucideIcon } from 'lucide-react';

export interface BaseFieldProps<T extends string = string> {
    name: T;
    label: string;
    value: string | number | boolean | File | null | undefined;
    onChange: (name: T, value: string | number | boolean | File | null) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface IconFieldProps {
    icon?: LucideIcon;
}

// ==================== Specific Field Props ====================

export type InputFieldProps<T extends string = string> = BaseFieldProps<T> &
    IconFieldProps & {
        placeholder?: string;
        type?: 'text' | 'email' | 'password' | 'url' | 'tel';
    };

export type NumberFieldProps<T extends string = string> = Omit<
    BaseFieldProps<T>,
    'value' | 'onChange'
> &
    IconFieldProps & {
        value: number | '' | undefined;
        onChange: (name: T, value: number | null) => void;
        placeholder?: string;
        min?: number;
        max?: number;
        step?: number;
    };

export type DecimalFieldProps<T extends string = string> = BaseFieldProps<T> &
    IconFieldProps & {
        placeholder?: string;
        min?: number;
        max?: number;
        step?: string;
        decimals?: number;
    };

export type SwitchFieldProps<T extends string = string> = BaseFieldProps<T> & {
    description?: string;
};

export interface SelectOption {
    value: string;
    label: string;
}

export type SelectFieldProps<T extends string = string> = BaseFieldProps<T> & {
    placeholder?: string;
    options: SelectOption[];
};
