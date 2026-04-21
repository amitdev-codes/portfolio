import { Head, router, useForm } from '@inertiajs/react';
import { File, Users } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { BreadcrumbDynamic } from '@/components/form-components/BreadcrumbDynamic';
import { ColorField } from '@/components/form-components/ColorField';
import { DateField } from '@/components/form-components/DateField';
import { FormActions } from '@/components/form-components/FormActions';
import { FormHeader } from '@/components/form-components/FormHeader';
import { ImageDropzone } from '@/components/form-components/ImageDropzone';
import { InputField } from '@/components/form-components/InputField';
import { NumberField } from '@/components/form-components/NumberField';
import { SwitchField } from '@/components/form-components/SwitchField';
import { UnitInputField } from '@/components/form-components/UnitInputField';
import { Card, CardContent } from '@/components/ui/card';
import { index, store, update } from '@/routes/admin/tech-talks';

export interface Media {
    id: number;
    collection_name: string;
    file_name: string;
    mime_type: string;
    original_url: string;
    preview_url: string;
}

interface TechTalk {
    id?: number;
    category: string;
    category_color: string;
    title: string;
    excerpt: string;
    date: string;
    read_time: string;
    sort_order: number;
    video_link: string;
    source_link: string;
    is_published: boolean;
    slug: string;
    cover_image?: File | null;
    media?: Media[];
}

interface Props {
    techTalk?: TechTalk;
}

export default function TechTalkForm({ techTalk }: Props) {
    const { data, setData, processing, errors } = useForm<TechTalk>({
        category: techTalk?.category || '',
        category_color: techTalk?.category_color || '',
        title: techTalk?.title || '',
        excerpt: techTalk?.excerpt || '',
        date: techTalk?.date || '',
        read_time: techTalk?.read_time || '',
        sort_order: techTalk?.sort_order || 0,
        video_link: techTalk?.video_link || '',
        source_link: techTalk?.source_link || '',
        is_published: techTalk?.is_published || false,
        slug: techTalk?.slug || '',
        cover_image: null,
    });

    // ✅ Existing image
    const existingCoverImage =
        techTalk?.media?.find(
            (m: Media) => m.collection_name === 'cover_image'
        )?.original_url ?? null;

    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
        existingCoverImage
    );

    // ✅ Clean onChange (no shownErrors logic)
    const formFieldOnChange = (
        name: keyof TechTalk,
        value: string | number | boolean | File | null
    ) => {
        setData(name, value as any);
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            ...data,
            media: data.media?.map((m) => m.id), // or URLs, etc.
        };

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    techTalk
                        ? 'Tech Talk updated successfully!'
                        : 'Tech Talk created successfully!'
                );
            },
            onError: () => {
                toast.error('Validation failed. Please check errors.');
            },
        };

        if (techTalk?.id) {
            router.put(
                update(techTalk.id),payload,
                options
            );
        } else {
            router.post(store(), payload, options);
        }
    };

    const MODEL_NAME = 'Tech Talk';
    const INDEX_ROUTE = index();
    const EDIT_ROUTE = techTalk?.id ? update(techTalk.id) : undefined;

    return (
        <>
            <BreadcrumbDynamic
                modelName={MODEL_NAME}
                model={techTalk}
                indexRoute={INDEX_ROUTE}
                editRoute={EDIT_ROUTE}
            />

            <Head title={techTalk ? 'Edit Tech Talk' : 'Create Tech Talk'} />

            <div className="p-4 md:p-6">
                <Card>
                    <FormHeader modelName={MODEL_NAME} model={techTalk} />

                    <CardContent className="p-0 pt-4">
                        <form onSubmit={submit} className="space-y-8 p-6 pb-12">
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b pb-4">
                                    <Users className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                                        Tech Talk Info
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <InputField
                                        name="title"
                                        label="Title"
                                        value={data.title}
                                        onChange={formFieldOnChange}
                                        error={errors.title}
                                        required
                                    />

                                    <InputField
                                        name="category"
                                        label="Category"
                                        value={data.category}
                                        onChange={formFieldOnChange}
                                        error={errors.category}
                                        required
                                    />

                                    <ColorField
                                        name="category_color"
                                        label="Category Color"
                                        value={data.category_color || '#3B82F6'}
                                        onChange={formFieldOnChange}
                                        error={errors.category_color}
                                    />

                                    <DateField
                                        name="date"
                                        label="Date"
                                        value={data.date}
                                        onChange={formFieldOnChange}
                                        error={errors.date}
                                        required
                                    />

                                    <UnitInputField
                                        name="read_time"
                                        label="Read Time"
                                        value={data.read_time}
                                        onChange={formFieldOnChange}
                                        error={errors.read_time}
                                        unit="min"
                                    />

                                    <NumberField
                                        name="sort_order"
                                        label="Sort Order"
                                        value={data.sort_order}
                                        onChange={formFieldOnChange}
                                        error={errors.sort_order}
                                    />

                                    <InputField
                                        name="video_link"
                                        label="Video Link"
                                        value={data.video_link}
                                        onChange={formFieldOnChange}
                                        error={errors.video_link}
                                        placeholder="https://your-video-link.com"
                                        icon={File}
                                    />

                                    <InputField
                                        name="source_link"
                                        label="Source Link"
                                        value={data.source_link}
                                        onChange={formFieldOnChange}
                                        error={errors.source_link}
                                        placeholder="https://your-source-link.com"
                                        icon={File}
                                    />

                                    <InputField
                                        name="slug"
                                        label="Slug"
                                        value={data.slug}
                                        onChange={formFieldOnChange}
                                        error={errors.slug}
                                    />
                                </div>
                            </section>

                            <SwitchField
                                name="is_published"
                                label="Is Published"
                                value={data.is_published}
                                onChange={formFieldOnChange}
                                error={errors.is_published}
                            />

                            <section>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <ImageDropzone
                                        name="cover_image"
                                        label="Cover Image"
                                        value={data.cover_image??null}
                                        onChange={(name, file) => {
                                            if (Array.isArray(file)) {
                                                return;
                                            }

                                            formFieldOnChange(name, file);

                                            if (file instanceof File) {
                                                setCoverImagePreview(
                                                    URL.createObjectURL(file),
                                                );
                                            }
                                        }}
                                        error={errors.cover_image as string}
                                        preview={coverImagePreview}
                                        aspectRatio="wide"
                                    />
                                </div>
                            </section>

                            <FormActions
                                modelName={MODEL_NAME}
                                processing={processing}
                                modelId={techTalk?.id}
                                indexRoute={INDEX_ROUTE}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
