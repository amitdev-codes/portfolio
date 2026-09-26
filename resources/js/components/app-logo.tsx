import { usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const {name} = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-current/15 text-current ring-1 ring-current/20">
                <AppLogoIcon className="size-5 fill-current text-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-current">
                    {name}
                </span>
            </div>
        </>
    );
}
