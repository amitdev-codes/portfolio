import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
// utils for route resolution
export function resolveHref(href: string | (() => string) | undefined): string {
    if (!href){
        return '';
    } 

    return typeof href === 'function' ? href() : href;
}

// For isCurrentUrl compatibility
export function isCurrentUrl(href: string | (() => string) | undefined, currentPath: string): boolean {
    const resolved = resolveHref(href);

    return currentPath === resolved || currentPath.startsWith(resolved + '/');
}

