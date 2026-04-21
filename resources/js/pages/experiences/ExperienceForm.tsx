import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDown, Globe, MapPin, User, Users,} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { BreadcrumbDynamic } from '@/components/form-components/BreadcrumbDynamic';
import { DateField } from '@/components/form-components/DateField';
import { FormActions } from '@/components/form-components/FormActions';
import { FormHeader } from '@/components/form-components/FormHeader';
import { ImageDropzone } from '@/components/form-components/ImageDropzone';
import { InputField } from '@/components/form-components/InputField';
import { NumberField } from '@/components/form-components/NumberField';
import { TextareaField } from '@/components/form-components/TextareaField';
import { Card, CardContent } from '@/components/ui/card';
import { index, store, update } from '@/routes/admin/experiences';

export interface Media {
    id: number;
    collection_name: string;
    file_name: string;
    mime_type: string;
    original_url: string;
    preview_url: string;
}

interface Experience {
    id?: number;
    role?: string;
    description?: string;
    company?: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    company_website?: string;
    company_logo: string | File | null;
    sort_order?: number;
}

interface Props {
    experience?: Experience;
    mode: 'create' | 'edit';
}

export default function ExperienceForm({ experience }: Props) {
    const { data, setData, processing, errors } = useForm<Experience>({
        role: experience?.role || '',
        description: experience?.description || '',
        company: experience?.company || '',
        start_date: experience?.start_date || '',
        end_date: experience?.end_date || '',
        is_current: experience?.is_current || false,
        company_logo: experience?.company_logo || '',
        company_website: experience?.company_website || '',
        sort_order: experience?.sort_order || 0,
    });

    const [shownErrors, setShownErrors] = useState<Set<string>>(new Set());
    // Extract existing image URLs
    const existingCompanyLogo =
        experience?.media?.find(
            (m) => m.collection_name === 'company_logos',
        )?.original_url ?? null;

    const [companyLogoPreview, setCompanyLogoPreview] =
        useState(existingCompanyLogo);

    const formFieldOnChange = (
        name: keyof Experience,
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

        if (experience?.id) {
            router.put(update(experience.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        'Experience Information Updated successfully!',
                        {
                            position: 'top-right',
                            duration: 4000,
                        },
                    );
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
                    toast.success(
                        'Experience Information created successfully!',
                        {
                            position: 'top-right',
                            duration: 4000,
                        },
                    );
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

    const MODEL_NAME = 'Experience Information';
    const INDEX_ROUTE = index();
    const EDIT_ROUTE = experience?.id ? update(experience.id!) : undefined;

    return (
        <>
            <BreadcrumbDynamic
                modelName={MODEL_NAME}
                model={experience}
                indexRoute={INDEX_ROUTE}
                editRoute={EDIT_ROUTE}
            />

            <Head
                title={
                    experience
                        ? `Edit ${experience.role}`
                        : 'Create Experience Information'
                }
            />

            <div className="p-4 md:p-6">
                <Card>
                    <FormHeader modelName={MODEL_NAME} model={experience} />
                    <CardContent className="p-0 pt-4">
                        <form onSubmit={submit} className="space-y-8 p-6 pb-12">
                            {/* Account Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Users className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Experience Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <InputField
                                        name="role"
                                        label="Role"
                                        value={data.role}
                                        onChange={formFieldOnChange}
                                        error={errors.role}
                                        required
                                        placeholder="Enter Role"
                                        icon={User}
                                    />
                                    <InputField
                                        name="company"
                                        label="company"
                                        value={data.company}
                                        onChange={formFieldOnChange}
                                        error={errors.company}
                                        placeholder="Enter company"
                                    />
                                    <DateField
                                        name="start_date"
                                        label="Start Date"
                                        value={data.start_date}
                                        onChange={formFieldOnChange}
                                        error={errors.start_date}
                                        placeholder="start date"
                                        required
                                    />

                                    <DateField
                                        name="end_date"
                                        label="End Date"
                                        value={data.end_date}
                                        onChange={formFieldOnChange}
                                        error={errors.end_date}
                                        placeholder="end date"
                                    />

                                    <InputField
                                        name="company_website"
                                        label="Company Website"
                                        value={data.company_website}
                                        onChange={formFieldOnChange}
                                        error={errors.company_website}
                                        placeholder="https://your-website.com"
                                        icon={Globe}
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
                                </div>
                            </section>
                            {/* Location Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Company Information
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <TextareaField
                                        name="description"
                                        label="Description"
                                        value={data.description}
                                        onChange={formFieldOnChange}
                                        error={errors.description}
                                        placeholder="Tell us about Experience..."
                                        rows={4}
                                    />

                                    <div className="flex items-center gap-2">
                                        <ImageDropzone
                                            name="company_logo"
                                            label="Company Image"
                                            value={data.company_logo}
                                            onChange={formFieldOnChange}
                                            error={
                                                errors.company_logo as string
                                            }
                                            preview={companyLogoPreview}
                                            aspectRatio="square"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Submit Buttons */}
                            <FormActions
                                modelName={MODEL_NAME}
                                processing={processing}
                                modelId={experience?.id}
                                indexRoute={INDEX_ROUTE}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
