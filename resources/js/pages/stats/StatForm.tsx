
import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDown,  Hash,  User, Users, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { BreadcrumbDynamic } from '@/components/form-components/BreadcrumbDynamic';
import { FormActions } from '@/components/form-components/FormActions';
import { FormHeader } from '@/components/form-components/FormHeader';
import { InputField } from '@/components/form-components/InputField';
import { NumberField } from '@/components/form-components/NumberField';
import { Card, CardContent } from '@/components/ui/card';
import { index, store, update } from '@/routes/admin/stats';

interface Stat {
    id?: number;
    value?:string;
    icon?:string;
    label?:string;
    sort_order?:number;
}

interface Props {
    stat?: Stat;
    mode: 'create' | 'edit';
}

export default function StatForm({ stat }: Props) {

    const { data, setData, processing, errors } = useForm<Stat>({
        value: stat?.value || '',
        icon: stat?.icon || '',
        label: stat?.label || '',
        sort_order: stat?.sort_order || 0,
    });

    const [shownErrors, setShownErrors] = useState<Set<string>>(new Set());
    const formFieldOnChange = (
        name: keyof Stat,
        value: string | number | boolean | File | null | string[],
    ) => {
        setData(name, value as any);

        if (errors[name]) {
            setShownErrors((prev) => {
                const newSet = new Set(prev);
                newSet.delete(name as string);

                return newSet;
            });
        }
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShownErrors(new Set());

        const payload = {
            ...data,
        };


        if (stat?.id) {
            router.put(update(stat.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Stat Information Updated successfully!', {
                        position: 'top-right',
                        duration: 4000,
                    });
                },
                onError: () => {
                    toast.error(
                        'Validation failed. Please check the errors below.',
                        {
                            position: 'top-right',
                            duration: 4000,
                        },
                    );
                },
            });
        } else {
            router.post(store(), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Stat Information created successfully!', {
                        position: 'top-right',
                        duration: 4000,
                    });
                },
                onError: () => {
                    toast.error(
                        'Validation failed. Please check the errors below.',
                        {
                            position: 'top-right',
                            duration: 4000,
                        },
                    );
                },
            });
        }
    };

    const MODEL_NAME = 'Stat Information';
    const INDEX_ROUTE = index();
    const EDIT_ROUTE = stat?.id ? update(stat.id!) : undefined;


    return (
        <>
            <BreadcrumbDynamic
                modelName={MODEL_NAME}
                model={stat}
                indexRoute={INDEX_ROUTE}
                editRoute={EDIT_ROUTE}
            />

            <Head
                title={stat ? `Edit ${stat.label}` : 'Create Stat Information'}
            />

            <div className="p-4 md:p-6">
                <Card>
                    <FormHeader modelName={MODEL_NAME} model={stat} />
                    <CardContent className="p-0 pt-4">
                        <form onSubmit={submit} className="space-y-8 p-6 pb-12">
                            {/* Account Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Users className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Stat Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <InputField
                                        name="label"
                                        label="Label"
                                        value={data.label}
                                        onChange={formFieldOnChange}
                                        error={errors.label}
                                        required
                                        placeholder="Enter Label"
                                        icon={User}
                                    />
                                    <InputField
                                        name="value"
                                        label="Value"
                                        value={data.value}
                                        onChange={formFieldOnChange}
                                        error={errors.value}
                                        placeholder="Enter Value"
                                        icon={Hash}
                                    />
                                    <NumberField
                                        name="sort_order"
                                        label="Sort Order"
                                        value={data.sort_order || 0}
                                        onChange={formFieldOnChange}
                                        error={errors.sort_order}
                                        placeholder="0"
                                        min={0}
                                        icon={ChevronDown}
                                    />

                                    <div className="flex items-center gap-2">
                                        <InputField
                                            name="icon"
                                            value={data.icon || ''}
                                            onChange={formFieldOnChange}
                                            error={errors.icon}
                                            placeholder="😎"
                                            className="flex-1"
                                        />
                                        <a
                                            href="https://emojipedia.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-muted-foreground hover:text-primary"
                                            title="Emoji Picker"
                                        >
                                            <Zap className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </section>

                            {/* Submit Buttons */}
                            <FormActions
                                modelName={MODEL_NAME}
                                processing={processing}
                                modelId={stat?.id}
                                indexRoute={INDEX_ROUTE}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
