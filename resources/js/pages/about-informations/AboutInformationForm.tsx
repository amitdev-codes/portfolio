import { Head, router, useForm } from '@inertiajs/react';
import {
    Sparkles,
    Layers,
    Clock,
    Code2,
    Plus,
    Trash2,
    AlertCircle,
    X,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { BreadcrumbDynamic } from '@/components/form-components/BreadcrumbDynamic';
import { FormActions } from '@/components/form-components/FormActions';
import { FormHeader } from '@/components/form-components/FormHeader';
import { InputField } from '@/components/form-components/InputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { index, store, update } from '@/routes/admin/about-informations';

interface Highlight {
    [key: string]: string;
    icon: string;
    title: string;
    desc: string;
}

interface Experience {
    [key: string]: string;
    year: string;
    role: string;
    company: string;
    desc: string;
}

interface AboutInformationData {
    [key: string]: string | boolean | Highlight[] | Experience[] | string[];
    section_label: string;
    heading_main: string;
    heading_highlight: string;
    highlights: Highlight[];
    experience_heading: string;
    experiences: Experience[];
    tech_stack_label: string;
    tech_stack: string[];
    is_active: boolean;
}

interface Props {
    aboutInformation?: AboutInformationData & { id: number };
    mode: 'create' | 'edit';
}

const DEFAULT_HIGHLIGHT: Highlight = { icon: '✨', title: '', desc: '' };
const DEFAULT_EXPERIENCE: Experience = {
    year: '',
    role: '',
    company: '',
    desc: '',
};

export default function AboutInformationForm({
    aboutInformation,
    mode,
}: Props) {
    const { data, setData, processing, errors } = useForm<AboutInformationData>(
        {
            section_label: aboutInformation?.section_label || 'About Me',
            heading_main: aboutInformation?.heading_main || 'What I',
            heading_highlight: aboutInformation?.heading_highlight || 'Bring',
            highlights:
                aboutInformation?.highlights &&
                aboutInformation.highlights.length > 0
                    ? aboutInformation.highlights
                    : [DEFAULT_HIGHLIGHT],
            experience_heading:
                aboutInformation?.experience_heading || 'Years of Experience',
            experiences:
                aboutInformation?.experiences &&
                aboutInformation.experiences.length > 0
                    ? aboutInformation.experiences
                    : [DEFAULT_EXPERIENCE],
            tech_stack_label:
                aboutInformation?.tech_stack_label || 'Tech Stack',
            tech_stack: aboutInformation?.tech_stack || [],
            is_active: aboutInformation?.is_active ?? true,
        },
    );

    const [techInput, setTechInput] = useState('');
    const [shownErrors, setShownErrors] = useState<Set<string>>(new Set());

    useEffect(() => {
        const errorKeys = Object.keys(errors);

        if (errorKeys.length > 0) {
            errorKeys.forEach((key) => {
                if (!shownErrors.has(key)) {
                    const errorMessage = errors[key as keyof typeof errors];

                    if (errorMessage) {
                        toast.error(
                            <div className="flex items-start gap-3">
                                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold capitalize">
                                        {key
                                            .replace(/_/g, ' ')
                                            .replace(/\./g, ' ')}
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
        name: keyof AboutInformationData,
        value: string | boolean,
    ) => {
        setData(name, value as any);

        if (errors[name]) {
            setShownErrors((prev) => {
                const newSet = new Set(prev);
                newSet.delete(name);

                return newSet;
            });
        }
    };

    // ── Highlights repeater ──
    const updateHighlight = (
        idx: number,
        field: keyof Highlight,
        value: string,
    ) => {
        const next = [...data.highlights];
        next[idx] = { ...next[idx], [field]: value };
        setData('highlights', next);
    };

    const addHighlight = () => {
        setData('highlights', [...data.highlights, { ...DEFAULT_HIGHLIGHT }]);
    };

    const removeHighlight = (idx: number) => {
        setData(
            'highlights',
            data.highlights.filter((_, i) => i !== idx),
        );
    };

    // ── Experiences repeater ──
    const updateExperience = (
        idx: number,
        field: keyof Experience,
        value: string,
    ) => {
        const next = [...data.experiences];
        next[idx] = { ...next[idx], [field]: value };
        setData('experiences', next);
    };

    const addExperience = () => {
        setData('experiences', [
            ...data.experiences,
            { ...DEFAULT_EXPERIENCE },
        ]);
    };

    const removeExperience = (idx: number) => {
        setData(
            'experiences',
            data.experiences.filter((_, i) => i !== idx),
        );
    };

    // ── Tech stack tag editor ──
    const addTech = () => {
        const value = techInput.trim();
        if (value && !data.tech_stack.includes(value)) {
            setData('tech_stack', [...data.tech_stack, value]);
        }
        setTechInput('');
    };

    const removeTech = (tech: string) => {
        setData(
            'tech_stack',
            data.tech_stack.filter((t) => t !== tech),
        );
    };

    const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTech();
        }
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShownErrors(new Set());

        const payload = { ...data };

        if (aboutInformation?.id) {
            router.put(update(aboutInformation.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('About Information updated successfully!', {
                        position: 'top-right',
                        duration: 4000,
                    });
                },
                onError: () => {
                    toast.error(
                        'Validation failed. Please check the errors below.',
                        { position: 'top-right', duration: 4000 },
                    );
                },
            });
        } else {
            router.post(store(), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('About Information created successfully!', {
                        position: 'top-right',
                        duration: 4000,
                    });
                },
                onError: () => {
                    toast.error(
                        'Validation failed. Please check the errors below.',
                        { position: 'top-right', duration: 4000 },
                    );
                },
            });
        }
    };

    const MODEL_NAME = 'About Information';
    const INDEX_ROUTE = index();
    const EDIT_ROUTE = aboutInformation?.id
        ? update(aboutInformation.id)
        : undefined;

    return (
        <>
            <BreadcrumbDynamic
                modelName={MODEL_NAME}
                model={aboutInformation}
                indexRoute={INDEX_ROUTE}
                editRoute={EDIT_ROUTE}
            />
            <Head
                title={
                    aboutInformation
                        ? 'Edit About Information'
                        : 'Create About Information'
                }
            />

            <div className="p-4 md:p-6">
                <Card>
                    <FormHeader
                        modelName={MODEL_NAME}
                        model={aboutInformation}
                    />
                    <CardContent className="p-0 pt-4">
                        <form onSubmit={submit} className="space-y-8 p-6 pb-12">
                            {/* Section Header */}
                            <section>
                                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                            Section Header
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) =>
                                                formFieldOnChange(
                                                    'is_active',
                                                    checked,
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="is_active"
                                            className="cursor-pointer text-xs"
                                        >
                                            Active
                                        </Label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <InputField
                                        name="section_label"
                                        label="Eyebrow Label"
                                        value={data.section_label}
                                        onChange={formFieldOnChange}
                                        error={errors.section_label}
                                        placeholder="About Me"
                                    />
                                    <InputField
                                        name="heading_main"
                                        label="Heading (plain part)"
                                        value={data.heading_main}
                                        onChange={formFieldOnChange}
                                        error={errors.heading_main}
                                        placeholder="What I"
                                    />
                                    <InputField
                                        name="heading_highlight"
                                        label="Heading (highlighted part)"
                                        value={data.heading_highlight}
                                        onChange={formFieldOnChange}
                                        error={errors.heading_highlight}
                                        placeholder="Bring"
                                    />
                                </div>
                            </section>

                            {/* Highlights repeater */}
                            <section>
                                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                                    <div className="flex items-center gap-2">
                                        <Layers className="h-4 w-4 text-primary" />
                                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                            Highlight Cards
                                        </h3>
                                    </div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={addHighlight}
                                    >
                                        <Plus className="mr-1 h-3.5 w-3.5" />
                                        Add Highlight
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {data.highlights.map((h, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg border border-border p-4"
                                        >
                                            <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-[80px_1fr]">
                                                <div>
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Icon (emoji)
                                                    </Label>
                                                    <Input
                                                        value={h.icon}
                                                        onChange={(e) =>
                                                            updateHighlight(
                                                                idx,
                                                                'icon',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="🎯"
                                                        maxLength={4}
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Title
                                                    </Label>
                                                    <Input
                                                        value={h.title}
                                                        onChange={(e) =>
                                                            updateHighlight(
                                                                idx,
                                                                'title',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Strategic Thinking"
                                                    />
                                                    {errors[
                                                        `highlights.${idx}.title` as keyof typeof errors
                                                    ] && (
                                                        <p className="mt-1 text-xs text-destructive">
                                                            {
                                                                errors[
                                                                    `highlights.${idx}.title` as keyof typeof errors
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Label className="mb-1 block text-xs text-muted-foreground">
                                                Description
                                            </Label>
                                            <div className="flex items-start gap-2">
                                                <textarea
                                                    value={h.desc}
                                                    onChange={(e) =>
                                                        updateHighlight(
                                                            idx,
                                                            'desc',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="I approach projects with clear goals..."
                                                    rows={2}
                                                    className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        removeHighlight(idx)
                                                    }
                                                    disabled={
                                                        data.highlights
                                                            .length <= 1
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {errors[
                                                `highlights.${idx}.desc` as keyof typeof errors
                                            ] && (
                                                <p className="mt-1 text-xs text-destructive">
                                                    {
                                                        errors[
                                                            `highlights.${idx}.desc` as keyof typeof errors
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Experience timeline repeater */}
                            <section>
                                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                            Experience Timeline
                                        </h3>
                                    </div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={addExperience}
                                    >
                                        <Plus className="mr-1 h-3.5 w-3.5" />
                                        Add Experience
                                    </Button>
                                </div>

                                <div className="mb-4">
                                    <InputField
                                        name="experience_heading"
                                        label="Timeline Heading"
                                        value={data.experience_heading}
                                        onChange={formFieldOnChange}
                                        error={errors.experience_heading}
                                        placeholder="Years of Experience"
                                    />
                                </div>

                                <div className="space-y-4">
                                    {data.experiences.map((exp, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg border border-border p-4"
                                        >
                                            <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                                                <div>
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Year Range
                                                    </Label>
                                                    <Input
                                                        value={exp.year}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                idx,
                                                                'year',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="2024–Now"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Role
                                                    </Label>
                                                    <Input
                                                        value={exp.role}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                idx,
                                                                'role',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Senior Full Stack Developer"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Company
                                                    </Label>
                                                    <Input
                                                        value={exp.company}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                idx,
                                                                'company',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="TechCorp Nepal"
                                                    />
                                                </div>
                                            </div>
                                            <Label className="mb-1 block text-xs text-muted-foreground">
                                                Description
                                            </Label>
                                            <div className="flex items-start gap-2">
                                                <textarea
                                                    value={exp.desc}
                                                    onChange={(e) =>
                                                        updateExperience(
                                                            idx,
                                                            'desc',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Led a team of 4 developers..."
                                                    rows={2}
                                                    className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        removeExperience(idx)
                                                    }
                                                    disabled={
                                                        data.experiences
                                                            .length <= 1
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Tech Stack */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Code2 className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Tech Stack
                                    </h3>
                                </div>

                                <div className="mb-4">
                                    <InputField
                                        name="tech_stack_label"
                                        label="Section Label"
                                        value={data.tech_stack_label}
                                        onChange={formFieldOnChange}
                                        error={errors.tech_stack_label}
                                        placeholder="Tech Stack"
                                    />
                                </div>

                                <Label className="mb-2 block">
                                    Technologies
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={techInput}
                                        onChange={(e) =>
                                            setTechInput(e.target.value)
                                        }
                                        onKeyDown={handleTechKeyDown}
                                        placeholder="Type a technology and press Enter (e.g. React)"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addTech}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {data.tech_stack.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {data.tech_stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs"
                                            >
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeTech(tech)
                                                    }
                                                    className="text-muted-foreground hover:text-destructive"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {errors.tech_stack && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {errors.tech_stack}
                                    </p>
                                )}
                            </section>

                            {/* Submit Buttons */}
                            <FormActions
                                modelName={MODEL_NAME}
                                processing={processing}
                                modelId={aboutInformation?.id}
                                indexRoute={INDEX_ROUTE}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
