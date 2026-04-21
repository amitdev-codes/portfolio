import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Globe,
    Image as ImageIcon,
    User,
    Users,
    Hash,
    Palette,
    Zap,
    ChevronDown,
    Star,
    Link as LinkIcon,
    Code, File,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BreadcrumbDynamic } from '@/components/form-components/BreadcrumbDynamic';
import { ColorField } from '@/components/form-components/ColorField';
import { FormActions } from '@/components/form-components/FormActions';
import { FormHeader } from '@/components/form-components/FormHeader';
import { ImageDropzone } from '@/components/form-components/ImageDropzone';
import { InputField } from '@/components/form-components/InputField';
import { NumberField } from '@/components/form-components/NumberField';
import { TextareaField } from '@/components/form-components/TextareaField';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { index, store, update } from '@/routes/admin/projects';

interface Project {
    id?: number;
    title?: string;
    slug?: string;
    short_description?: string | null;
    full_description?: string | null;
    emoji?: string | null;
    color?: string;
    accent?: string;
    tech: string[] | string | null;
    link?: string | null;
    is_featured: boolean;
    sort_order: number;
    cover_image?: File | null;
    screenshots?: Array<{ id: number; url: string }>;
    media?: Array<{
        collection_name: string;
        original_url: string;
    }>;
}

interface Props {
    project?: Project;
}
type ProjectForm = {
    title: string;
    slug: string;
    short_description: string;
    full_description: string;
    emoji: string;
    color: string;
    accent: string;
    tech: string[];
    link: string;
    is_featured: boolean;
    sort_order: number;

    cover_image: File | null;
    screenshots: File[];
};
export default function ProjectForm({ project }: Props) {
    // Initialize tech as array
    const initialTech = Array.isArray(project?.tech)
        ? project.tech
        : typeof project?.tech === 'string'
          ? project.tech
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
          : [];

    const { data, setData, processing, errors } = useForm<Project>({
        title: project?.title || '',
        slug: project?.slug || '',
        short_description: project?.short_description || '',
        full_description: project?.full_description || '',
        emoji: project?.emoji || '',
        color: project?.color || '#3B82F6',
        accent: project?.accent || '#1D4ED8',
        tech: initialTech,
        link: project?.link || '',
        is_featured: Boolean(project?.is_featured),
        sort_order: project?.sort_order || 0,
    });

    // Tech stack state management
    const [techInput, setTechInput] = useState('');
    const [techList, setTechList] = useState<string[]>(initialTech);

    // Update techList when data.tech changes
    // useEffect(() => {
    //     if (Array.isArray(data.tech)) {
    //         setTechList(data.tech);
    //     }
    // }, [data.tech]);

    // Track if errors have been shown to prevent duplicate toasts
    const [shownErrors, setShownErrors] = useState<Set<string>>(new Set());

    // ✅ Replace with this:


    // Image preview states
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
        null,
    );
    const [coverFile, setCoverFile] = useState<File | null>(null);

    const [screenshotsPreviews, setScreenshotsPreviews] = useState<string[]>(
        [],
    );
    const [screenshotsFiles, setScreenshotsFiles] = useState<File[]>([]);

    useEffect(() => {
        if (!project) {
            return;
        }

        if (project.cover_image) {

            setCoverImagePreview(project.cover_image);
        }

        if (project.screenshots) {
            setScreenshotsPreviews(project.screenshots.map((s) => s.url));
        }
    }, [project]);

    // Watch for validation errors and show them
    useEffect(() => {
        const errorKeys = Object.keys(errors);

        if (errorKeys.length > 0) {
            errorKeys.forEach((key) => {
                if (!shownErrors.has(key)) {
                    const errorMessage = errors[key as keyof typeof errors];

                    if (errorMessage) {
                        toast.error(
                            <div className="flex items-start gap-3">
                                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                                <div>
                                    <p className="font-semibold capitalize">
                                        {key.replace(/_/g, ' ')}
                                    </p>
                                    <p className="mt-1 text-sm">
                                        {errorMessage}
                                    </p>
                                </div>
                            </div>,
                            {
                                duration: 5000,
                                position: 'top-right',
                                closeButton: true,
                            },
                        );
                        setShownErrors((prev) => new Set(prev).add(key));
                    }
                }
            });
        }
    }, [errors, shownErrors]);

    const formFieldOnChange = (
        name: keyof Project,
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

    // Tech stack handlers
    const addTech = () => {
        if (techInput.trim()) {
            const newTech = [...techList, techInput.trim()];
            setTechList(newTech);
            setData('tech', newTech);
            setTechInput('');
        }
    };

    const removeTech = (index: number) => {
        const newTech = techList.filter((_, i) => i !== index);
        setTechList(newTech);
        setData('tech', newTech);
    };

    const handleTechInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTech();
        }
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShownErrors(new Set());

        const payload = {
            ...data,
            tech: techList, // Ensure tech is always array
        };

        if (project?.id) {
            router.put(update(project.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Project Information Updated successfully!', {
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
                    toast.success('Project Information created successfully!', {
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

    const MODEL_NAME = 'Project Information';
    const INDEX_ROUTE = index();
    const EDIT_ROUTE = project?.id ? update(project.id!) : undefined;

    return (
        <>
            <BreadcrumbDynamic
                modelName={MODEL_NAME}
                model={project}
                indexRoute={INDEX_ROUTE}
                editRoute={EDIT_ROUTE}
            />

            <Head
                title={
                    project
                        ? `Edit ${project.title}`
                        : 'Create Project Information'
                }
            />

            <div className="p-4 md:p-6">
                <Card>
                    <FormHeader modelName={MODEL_NAME} model={project} />
                    <CardContent className="p-0 pt-4">
                        <form onSubmit={submit} className="space-y-8 p-6 pb-12">
                            {/* Account Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Users className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Account Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <InputField
                                        name="title"
                                        label="Title"
                                        value={data.title}
                                        onChange={formFieldOnChange}
                                        error={errors.title}
                                        required
                                        placeholder="Enter Title"
                                        icon={User}
                                    />
                                    <InputField
                                        name="slug"
                                        label="Slug"
                                        value={data.slug}
                                        onChange={formFieldOnChange}
                                        error={errors.slug}
                                        placeholder="Enter Slug"
                                        icon={Hash}
                                    />
                                    <InputField
                                        name="short_description"
                                        label="Short Description"
                                        value={data.short_description || ''}
                                        onChange={formFieldOnChange}
                                        error={errors.short_description}
                                        placeholder="Short bio (max 160 chars)"
                                    />
                                    <TextareaField
                                        name="full_description"
                                        label="Description"
                                        value={data.full_description ?? ''}
                                        onChange={formFieldOnChange}
                                        error={errors.full_description}
                                        placeholder="Tell us about Project..."
                                        rows={4}
                                    />
                                </div>
                            </section>

                            {/* Styling Section */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Palette className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Styling & Emoji
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <InputField
                                                name="emoji"
                                                label="Emoji"
                                                value={data.emoji || ''}
                                                onChange={(name, value) =>
                                                    formFieldOnChange(
                                                        name as keyof Project,
                                                        value as any,
                                                    )
                                                }
                                                error={errors.emoji}
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
                                    <div className="space-y-2">
                                        <ColorField
                                            name="color"
                                            label="Primary Color"
                                            value={data.color || '#3B82F6'}
                                            onChange={formFieldOnChange}
                                            error={errors.color}
                                            className="h-12 p-1"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <ColorField
                                            name="accent"
                                            label="Accent Color"
                                            value={data.accent || '#1D4ED8'}
                                            onChange={formFieldOnChange}
                                            error={errors.accent}
                                            className="h-12 p-1"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Tech Stack */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Code className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Tech Stack
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            value={techInput}
                                            onChange={(e) =>
                                                setTechInput(e.target.value)
                                            }
                                            onKeyDown={handleTechInputKeyDown}
                                            placeholder="e.g., React, Node.js, TypeScript"
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addTech}
                                            variant="outline"
                                            size="sm"
                                            disabled={!techInput.trim()}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    {errors.tech && (
                                        <p className="rounded-md bg-destructive/10 px-3 py-1 text-sm text-destructive">
                                            {errors.tech}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {techList.map((tech, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="flex items-center gap-1 px-3 py-1"
                                            >
                                                {tech}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-1 h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                                    onClick={() =>
                                                        removeTech(index)
                                                    }
                                                >
                                                    ×
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    {techList.length === 0 && (
                                        <p className="py-4 text-center text-sm text-muted-foreground">
                                            No technologies added yet
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* Link & Featured */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <LinkIcon className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Link & Visibility
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <InputField
                                        name="link"
                                        label="Project Link"
                                        value={data.link || ''}
                                        onChange={formFieldOnChange}
                                        error={errors.link}
                                        placeholder="https://github.com/username/project"
                                        icon={Globe}
                                    />
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 text-sm font-medium">
                                            <Star className="h-4 w-4" />
                                            Featured Project
                                        </Label>
                                        <Switch
                                            checked={data.is_featured || false}
                                            onCheckedChange={(checked) =>
                                                formFieldOnChange(
                                                    'is_featured',
                                                    checked,
                                                )
                                            }
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        {errors.is_featured && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.is_featured}
                                            </p>
                                        )}
                                    </div>
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

                            {/* Images */}
                            {/* Images */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <ImageIcon className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Project Screenshots
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <ImageDropzone
                                        name="cover_image"
                                        label="Cover Image"
                                        value={coverFile}
                                        onChange={(name, file) => {
                                            const f = Array.isArray(file)
                                                ? null
                                                : file;

                                            setCoverFile(f);

                                            setData('cover_image', f);

                                            if (f instanceof File) {
                                                setCoverImagePreview(
                                                    URL.createObjectURL(f),
                                                );
                                            }
                                        }}
                                        error={errors.cover_image as string}
                                        preview={coverImagePreview}
                                        aspectRatio="wide"
                                        multiple={false}
                                    />
                                    <div>
                                        <ImageDropzone
                                            name="screenshots"
                                            label="Project Screenshots"
                                            value={screenshotsFiles}
                                            onChange={(name, files) => {
                                                const arr = Array.isArray(files)
                                                    ? files
                                                    : files
                                                      ? [files]
                                                      : [];

                                                setScreenshotsFiles(arr);

                                                setData(
                                                    'screenshots',
                                                    arr as any,
                                                );
                                            }}
                                            error={errors.screenshots as string}
                                            previews={screenshotsPreviews}
                                            onPreviewChange={
                                                setScreenshotsPreviews
                                            }
                                            aspectRatio="portrait"
                                            multiple={true}
                                            maxFiles={10}
                                        />
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Upload up to 10 screenshots.
                                            Recommended size: 800x600px
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Submit Buttons */}
                            <FormActions
                                modelName={MODEL_NAME}
                                processing={processing}
                                modelId={project?.id}
                                indexRoute={INDEX_ROUTE}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
