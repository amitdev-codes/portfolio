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
import { Card, CardContent } from '@/components/ui/card';
import { index, store, update } from '@/routes/admin/portfolio-informations';

export interface Media {
    id: number;
    collection_name: string;
    file_name: string;
    mime_type: string;
    original_url: string;
    preview_url: string;
}

interface PortfolioInformation {
    id?: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    address: string;
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
    profile_image: string | File | null;
    cover_image: string | File | null;
}

interface Props {
    portfolioInformation?: PortfolioInformation & { media?: Media[] };
    mode: 'create' | 'edit';
}

export default function PortFolioInformationForm({ portfolioInformation, mode,
                                                 }: Props) {
    const { data, setData, processing, errors } = useForm<PortfolioInformation>(
        {
            first_name: portfolioInformation?.first_name || '',
            middle_name: portfolioInformation?.middle_name || '',
            last_name: portfolioInformation?.last_name || '',
            email: portfolioInformation?.email || '',
            address: portfolioInformation?.address || '',
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
            profile_image: null,
            cover_image: null,
        },
    );

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
                // Avoid showing duplicate toasts for the same error
                if (!shownErrors.has(key)) {
                    const errorMessage = errors[key as keyof typeof errors];

                    if (errorMessage) {
                        toast.error(
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold capitalize">
                                        {key.replace(/_/g, ' ')}
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

                        // Mark this error as shown
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

        // Clear the error for this field when user starts editing
        if (errors[name]) {
            setShownErrors((prev) => {
                const newSet = new Set(prev);
                newSet.delete(name);

                return newSet;
            });
        }
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Reset shown errors on new submission
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
                    // Errors will be caught by the useEffect above
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
                    // Errors will be caught by the useEffect above
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

                            {/* Location Information */}
                            <section>
                                <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Location Information
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <InputField
                                        name="address"
                                        label="Address"
                                        value={data.address}
                                        onChange={formFieldOnChange}
                                        error={errors.address}
                                        required
                                        placeholder="Enter full address"
                                        icon={Home}
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
                                    <InputField
                                        name="cv_link"
                                        label="CV Link"
                                        value={data.cv_link}
                                        onChange={formFieldOnChange}
                                        error={errors.cv_link}
                                        placeholder="https://your-cv-link.com"
                                        icon={File}
                                    />
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
                                        label="Short Description"
                                        value={data.small_description || ''}
                                        onChange={formFieldOnChange}
                                        error={errors.small_description}
                                        placeholder="Short bio (max 160 chars)"
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
