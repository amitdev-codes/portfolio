import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href?: NonNullable<InertiaLinkProps['href']>;  // ✅ Optional
    url?: string | (() => string);  // ✅ Route helpers
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];  // ✅ Submenu support
};
