import { Head, router, useForm } from '@inertiajs/react';
import {
    Users,
    MapPin,
    Phone,
    Link2,
    FileText,
    Image as ImageIcon,
    User,
    Mail,
    Home,
    Globe,
    File,
    Linkedin,
    Github,
    AlertCircle,
    Sparkles,
    Plus,
    Trash2,
    Briefcase,
    Code2,
    Upload,
    X,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { BreadcrumbDynamic } from '@/components/form-components/BreadcrumbDynamic';
import { FormActions } from '@/components/form-components/FormActions';
import { FormHeader } from '@/components/form-components/FormHeader';
import { ImageDropzone } from '@/components/form-components/ImageDropzone';
import { InputField } from '@/components/form-components/InputField';
import { NepalPhoneField } from '@/components/form-components/NepalPhoneField';
import { NumberField } from '@/components/form-components/NumberField';
import { TextareaField } from '@/components/form-components/TextareaField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { index, store, update } from '@/routes/admin/portfolio-informations';

export interface Media {
    id: number;
    collection_name: string;
    file_name: string;
    mime_type: string;
    original_url: string;
    preview_url: string;
}

interface HeroStat {
    value: string;
    label: string;
}

interface PortfolioInformation {
    id?: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    role_title: string;
    tech_stack: string;
    address: string;
    short_location: string;
    latitude: string;
    longitude: string;
    phone_number: string;
    mobile_number: string;
    cv_link: string;
    linkedin_link: string;
    github_link: string;
    website_link: string;
    small_description: string | null;
    description: string;
    seo_title: string;
    seo_metatags: string;
    is_available: boolean;
    availability_text: string;
    stats: HeroStat[];
    skills: string[];
    profile_image: string | File | null;
    cover_image: string | File | null;
    cv_file: File | null;
}

interface Props {
    portfolioInformation?: PortfolioInformation & { media?: Media[] };
    mode: 'create' | 'edit';
}

const DEFAULT_STATS: HeroStat[] = [
    { value: '3+', label: 'Years Exp.' },
    { value: '20+', label: 'Projects' },
    { value: '15+', label: 'Clients' },
    { value: '99%', label: 'Uptime' },
];

export default function PortFolioInformationForm({
                                                     portfolioInformation,

                                                 }: Props) {
    const { data, setData, processing, errors } = useForm<PortfolioInformation>(
        {
            first_name: portfolioInformation?.first_name || '',
            middle_name: portfolioInformation?.middle_name || '',
            last_name: portfolioInformation?.last_name || '',
            email: portfolioInformation?.email || '',
            role_title: portfolioInformation?.role_title || '',
            tech_stack: portfolioInformation?.tech_stack || '',
            address: portfolioInformation?.address || '',
            short_location: portfolioInformation?.short_location || '',
            latitude: portfolioInformation?.latitude || '',
            longitude: portfolioInformation?.longitude || '',
            phone_number: portfolioInformation?.phone_number || '',
            mobile_number: portfolioInformation?.mobile_number || '',
            cv_link: portfolioInformation?.cv_link || '',
            linkedin_link: portfolioInformation?.linkedin_link || '',
            github_link: portfolioInformation?.github_link || '',
            website_link: portfolioInformation?.website_link || '',
            small_description: portfolioInformation?.small_description || '',
            description: portfolioInformation?.description || '',
            seo_title: portfolioInformation?.seo_title || '',
            seo_metatags: portfolioInformation?.seo_metatags || '',
            is_available: portfolioInformation?.is_available ?? true,
            availability_text:
                portfolioInformation?.availability_text ||
                'Available for work',
            stats:
                portfolioInformation?.stats &&
                portfolioInformation.stats.length > 0
                    ? portfolioInformation.stats
                    : DEFAULT_STATS,
            skills: portfolioInformation?.skills || [],
            profile_image: null,
            cover_image: null,
            cv_file: null,
        },
    );

    const [skillInput, setSkillInput] = useState('');

    // Track if errors have been shown to prevent duplicate toasts
    const [shownErrors, setShownErrors] = useState<Set<string>>(new Set());

    // Extract existing image URLs
    const existingProfileImage =
        portfolioInformation?.media?.find(
            (m) => m.collection_name === 'profile_images',
        )?.original_url ?? null;

    const existingCoverImage =
        portfolioInformation?.media?.find(
            (m) => m.collection_name === 'cover_images',
        )?.original_url ?? null;

    const existingCv = portfolioInformation?.media?.find(
        (m) => m.collection_name === 'cv_documents',
    ) ?? null;

    // Image preview states
    const [profileImagePreview, setProfileImagePreview] =
        useState(existingProfileImage);
    const [coverImagePreview, setCoverImagePreview] =
        useState(existingCoverImage);

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
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold capitalize">
                                        {key.replace(/_/g, ' ').replace(/\./g, ' ')}
                                    </p>
                                    <p className="text-sm mt-1">{errorMessage}</p>
                                </div>
                            </div>,
                            {
                                duration: 5000,
                                position: 'top-right',
                                closeButton: true,
                            }
                        );

                        setShownErrors((prev) => new Set(prev).add(key));
                    }
                }
            });
        }
    }, [errors, shownErrors]);

    const formFieldOnChange = (
        name: keyof PortfolioInformation,
        value: string | number | boolean | File | null,
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

    // ── Stats repeater helpers ──
    const updateStat = (
        idx: number,
        field: keyof HeroStat,
        value: string,
    ) => {
        const next = [...data.stats];
        next[idx] = { ...next[idx], [field]: value };
        setData('stats', next);
    };

    const addStat = () => {
        setData('stats', [...data.stats, { value: '', label: '' }]);
    };

    const removeStat = (idx: number) => {
        setData(
            'stats',
            data.stats.filter((_, i) => i !== idx),
        );
    };

    // ── Skills tag helpers ──
    const addSkill = () => {
        const value = skillInput.trim();

        if (value && !data.skills.includes(value)) {
            setData('skills', [...data.skills, value]);
        }

        setSkillInput('');
    };

    const removeSkill = (skill: string) => {
        setData(
            'skills',
            data.skills.filter((s) => s !== skill),
        );
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addSkill();
        }
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        setShownErrors(new Set());

        const payload = {
            ...data,
        };

        if (portfolioInformation?.id) {
            router.put(update(portfolioInformation.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        'PortFolio Information Updated successfully!',
                        {
                            position: 'top-right',
                            duration: 4000,
                        }
                    );
                },
                onError: () => {
                    toast.error('Validation failed. Please check the errors below.', {
                        position: 'top-right',
                        duration: 4000,
                    });
                },
            });
        } else {
            router.post(store(), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        'PortFolio Information created successfully!',
                        {
                            position: 'top-right',
                            duration: 4000,
                        }
                    );
                },
                onError: () => {
                    toast.error('Validation failed. Please check the errors below.', {
                        position: 'top-right',
                        duration: 4000,
                    });
                },
            });
        }
    };

    const MODEL_NAME = 'Portfolio Information';
    const INDEX_ROUTE = index();
    const EDIT_ROUTE = portfolioInformation?.id
        ? update(portfolioInformation.id!)
        : undefined;

    return (
        <>
            <BreadcrumbDynamic
                modelName={MODEL_NAME}
                model={portfolioInformation}
                indexRoute={INDEX_ROUTE}
                editRoute={EDIT_ROUTE}
            />
            <Head
                title={
                    portfolioInformation
                        ? `Edit ${portfolioInformation.first_name}`
                        : 'Create Portfolio Information'
                }
            />

            <div className="p-4 md:p-6">
                <Card>
                    <FormHeader
                        modelName={MODEL_NAME}
                        model={portfolioInformation}
                    />
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
                                        name="first_name"
                                        label="First Name"
                                        value={data.first_name}
                                        onChange={formFieldOnChange}
                                        error={errors.first_name}
                                        required
                                        placeholder="Enter first name"
                                        icon={User}
                                    />
                                    <InputField
                                        name="middle_name"
                                        label="Middle Name"
                                        value={data.middle_name}
                                        onChange={formFieldOnChange}
                                        error={errors.middle_name}
                                        placeholder="Enter middle name"
                                        icon={User}
                                    />
                                    <InputField
                                        name="last_name"
                                        label="Last Name"
                                        value={data.last_name}
                                        onChange={formFieldOnChange}
                                        error={errors.last_name}
                                        required
                                        placeholder="Enter last name"
                                        icon={User}
                                    />
                                    <InputField
                                        name="email"
                                        label="Email"
                                        value={data.email}
                                        onChange={formFieldOnChange}
                                        error={errors.email}
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        icon={Mail}
                                    />
                                </div>
                            </section>

                            {/* Hero / Display Settings */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Hero Section Settings
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <InputField
                                        name="role_title"
                                        label="Role / Title"
                                        value={data.role_title}
                                        onChange={formFieldOnChange}
                                        error={errors.role_title}
                                        placeholder="Full Stack Developer"
                                        icon={Briefcase}
                                    />
                                    <InputField
                                        name="tech_stack"
                                        label="Tech Stack Badge"
                                        value={data.tech_stack}
                                        onChange={formFieldOnChange}
                                        error={errors.tech_stack}
                                        placeholder="React + Laravel"
                                        icon={Code2}
                                    />
                                </div>

                                {/* Availability toggle */}
                                <div className="mt-4 flex flex-col gap-4 rounded-lg border border-border p-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            id="is_available"
                                            checked={data.is_available}
                                            onCheckedChange={(checked) =>
                                                formFieldOnChange(
                                                    'is_available',
                                                    checked,
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor="is_available"
                                            className="cursor-pointer"
                                        >
                                            Show "Available for work" badge
                                        </Label>
                                    </div>
                                    <div className="w-full md:w-72">
                                        <Input
                                            value={data.availability_text}
                                            onChange={(e) =>
                                                formFieldOnChange(
                                                    'availability_text',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Available for work"
                                            disabled={!data.is_available}
                                        />
                                        {errors.availability_text && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.availability_text}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Stats repeater */}
                                <div className="mt-6">
                                    <div className="mb-3 flex items-center justify-between">
                                        <Label>Hero Stats (stat pills)</Label>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={addStat}
                                        >
                                            <Plus className="mr-1 h-3.5 w-3.5" />
                                            Add Stat
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.stats.map((stat, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-3 rounded-lg border border-border p-3"
                                            >
                                                <div className="flex-1">
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Value
                                                    </Label>
                                                    <Input
                                                        value={stat.value}
                                                        onChange={(e) =>
                                                            updateStat(
                                                                idx,
                                                                'value',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="3+"
                                                    />
                                                    {errors[
                                                        `stats.${idx}.value` as keyof typeof errors
                                                        ] && (
                                                        <p className="mt-1 text-xs text-destructive">
                                                            {
                                                                errors[
                                                                    `stats.${idx}.value` as keyof typeof errors
                                                                    ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <Label className="mb-1 block text-xs text-muted-foreground">
                                                        Label
                                                    </Label>
                                                    <Input
                                                        value={stat.label}
                                                        onChange={(e) =>
                                                            updateStat(
                                                                idx,
                                                                'label',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Years Exp."
                                                    />
                                                    {errors[
                                                        `stats.${idx}.label` as keyof typeof errors
                                                        ] && (
                                                        <p className="mt-1 text-xs text-destructive">
                                                            {
                                                                errors[
                                                                    `stats.${idx}.label` as keyof typeof errors
                                                                    ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    className="mt-5 text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        removeStat(idx)
                                                    }
                                                    disabled={
                                                        data.stats.length <= 1
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills tag editor */}
                                <div className="mt-6">
                                    <Label className="mb-2 block">
                                        Skills / Tech Tags (shown as chips in Hero)
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={skillInput}
                                            onChange={(e) =>
                                                setSkillInput(e.target.value)
                                            }
                                            onKeyDown={handleSkillKeyDown}
                                            placeholder="Type a skill and press Enter (e.g. React)"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addSkill}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {data.skills.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {data.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeSkill(skill)
                                                        }
                                                        className="text-muted-foreground hover:text-destructive"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {errors.skills && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.skills}
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* Location Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Location Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <InputField
                                        name="address"
                                        label="Full Address"
                                        value={data.address}
                                        onChange={formFieldOnChange}
                                        error={errors.address}
                                        required
                                        placeholder="Enter full address"
                                        icon={Home}
                                    />
                                    <InputField
                                        name="short_location"
                                        label="Short Location (Hero badge)"
                                        value={data.short_location}
                                        onChange={formFieldOnChange}
                                        error={errors.short_location}
                                        placeholder="Kathmandu, Nepal"
                                        icon={MapPin}
                                    />
                                    <NumberField
                                        name="latitude"
                                        label="Latitude"
                                        value={parseFloat(data.latitude) || ''}
                                        onChange={formFieldOnChange}
                                        error={errors.latitude}
                                        required
                                        min={-90}
                                        max={90}
                                        step={0.000001}
                                        placeholder="26.8467"
                                        icon={MapPin}
                                    />
                                    <NumberField
                                        name="longitude"
                                        label="Longitude"
                                        value={parseFloat(data.longitude) || ''}
                                        onChange={formFieldOnChange}
                                        error={errors.longitude}
                                        required
                                        min={-180}
                                        max={180}
                                        step={0.000001}
                                        placeholder="85.3330"
                                        icon={MapPin}
                                    />
                                </div>
                            </section>

                            {/* Contact Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Contact Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <NepalPhoneField
                                        name="phone_number"
                                        label="Phone Number"
                                        value={data.phone_number}
                                        error={errors.phone_number as string}
                                        required
                                        onChange={formFieldOnChange}
                                    />
                                    <NepalPhoneField
                                        name="mobile_number"
                                        label="Mobile Number"
                                        value={data.mobile_number}
                                        error={errors.mobile_number as string}
                                        required
                                        onChange={formFieldOnChange}
                                    />
                                </div>
                            </section>

                            {/* Social Links */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <Link2 className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Social & Links
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <InputField
                                            name="cv_link"
                                            label="CV Link (fallback URL)"
                                            value={data.cv_link}
                                            onChange={formFieldOnChange}
                                            error={errors.cv_link}
                                            placeholder="https://drive.google.com/..."
                                            icon={File}
                                        />
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Used only if no CV file is uploaded below.
                                        </p>
                                    </div>

                                    <div>
                                        <Label className="mb-1.5 block">
                                            CV File (PDF or DOCX)
                                        </Label>
                                        {existingCv && !data.cv_file && (
                                            <div className="mb-2 flex items-center justify-between rounded-lg border border-border p-2.5">
                                                <a
                                                    href={existingCv.original_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                    {existingCv.file_name}
                                                </a>
                                            </div>
                                        )}
                                        {data.cv_file && (
                                            <div className="mb-2 flex items-center justify-between rounded-lg border border-border p-2.5">
                                                <span className="flex items-center gap-2 text-sm">
                                                    <FileText className="h-4 w-4" />
                                                    {data.cv_file.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        formFieldOnChange(
                                                            'cv_file',
                                                            null,
                                                        )
                                                    }
                                                    className="text-muted-foreground hover:text-destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                        <label
                                            htmlFor="cv_file"
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {existingCv || data.cv_file
                                                ? 'Replace CV file'
                                                : 'Upload CV file'}
                                            <input
                                                id="cv_file"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={(e) =>
                                                    formFieldOnChange(
                                                        'cv_file',
                                                        e.target.files?.[0] ||
                                                        null,
                                                    )
                                                }
                                            />
                                        </label>
                                        {errors.cv_file && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.cv_file}
                                            </p>
                                        )}
                                    </div>

                                    <InputField
                                        name="linkedin_link"
                                        label="LinkedIn"
                                        value={data.linkedin_link}
                                        onChange={formFieldOnChange}
                                        error={errors.linkedin_link}
                                        placeholder="https://linkedin.com/in/..."
                                        icon={Linkedin}
                                    />
                                    <InputField
                                        name="github_link"
                                        label="GitHub"
                                        value={data.github_link}
                                        onChange={formFieldOnChange}
                                        error={errors.github_link}
                                        placeholder="https://github.com/..."
                                        icon={Github}
                                    />
                                    <InputField
                                        name="website_link"
                                        label="Website"
                                        value={data.website_link}
                                        onChange={formFieldOnChange}
                                        error={errors.website_link}
                                        placeholder="https://your-website.com"
                                        icon={Globe}
                                    />
                                </div>
                            </section>

                            {/* Descriptions & SEO Section */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Descriptions & SEO
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <InputField
                                        name="small_description"
                                        label="Short Description (Hero tagline)"
                                        value={data.small_description || ''}
                                        onChange={formFieldOnChange}
                                        error={errors.small_description}
                                        placeholder="Short bio (max 500 chars)"
                                    />

                                    <TextareaField
                                        name="description"
                                        label="Description"
                                        value={data.description}
                                        onChange={formFieldOnChange}
                                        error={errors.description}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                    />

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <InputField
                                            name="seo_title"
                                            label="SEO Title"
                                            value={data.seo_title}
                                            onChange={formFieldOnChange}
                                            error={errors.seo_title}
                                            placeholder="SEO Title (max 60 chars)"
                                        />
                                        <TextareaField
                                            name="seo_metatags"
                                            label="SEO Meta Tags"
                                            value={data.seo_metatags}
                                            onChange={formFieldOnChange}
                                            error={errors.seo_metatags}
                                            placeholder="e.g., description, keywords, author..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Images */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <ImageIcon className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Profile Images
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <ImageDropzone
                                        name="profile_image"
                                        label="Profile Image"
                                        value={data.profile_image}
                                        onChange={formFieldOnChange}
                                        error={errors.profile_image as string}
                                        preview={profileImagePreview}
                                        aspectRatio="square"
                                    />
                                    <ImageDropzone
                                        name="cover_image"
                                        label="Cover Image"
                                        value={data.cover_image}
                                        onChange={formFieldOnChange}
                                        error={errors.cover_image as string}
                                        preview={coverImagePreview}
                                        aspectRatio="wide"
                                    />
                                </div>
                            </section>

                            {/* Submit Buttons */}
                            <FormActions
                                modelName={MODEL_NAME}
                                processing={processing}
                                modelId={portfolioInformation?.id}
                                indexRoute={INDEX_ROUTE}
                            />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
