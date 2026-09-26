import { usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-1 ring-white/25">
                <AppLogoIcon className="size-8" alt={String(name ?? 'Logo')} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-current">
                    {name}
                </span>
            </div>
        </>
    );
}
