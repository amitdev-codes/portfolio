// hooks/useForm.ts
import { useState } from 'react';

type FormData = Record<string, string | number | boolean>;

export const useForm = (initialData: FormData) => {
    const [data, setData] = useState<FormData>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (name: string, value: string | number | boolean) => {
        setData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name as keyof typeof newErrors];

            return newErrors;
        });
    };

    const reset = (newData?: Partial<FormData>) => {

        setData({ ...initialData, ...newData });

        setErrors({});
    };

    const setError = (field: string, message: string) => {
        setErrors((prev) => ({ ...prev, [field]: message }));
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        data,
        setData,
        errors,
        setErrors,
        processing,
        setProcessing,
        handleChange,
        reset,
        setError,
        clearErrors,
    };
};
