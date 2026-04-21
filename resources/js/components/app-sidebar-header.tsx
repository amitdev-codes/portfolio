import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Moon, Sun, Globe, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { logout } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props as {
        auth: { user: { name: string; avatar?: string } };
    };
    const { appearance, updateAppearance } = useAppearance();
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    // Simplified Dark/Light toggle handler
    const toggleAppearance = () => {
        updateAppearance(appearance === 'light' ? 'dark' : 'light');
    };

    // Profile actions
    const handleLogout = () => {
        router.post(logout.url());
    };

    const handleViewProfile = () => {
        window.location.href = '/profile';
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            {/* Left side */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                {/* Language Dropdown with Google Translate */}
                <DropdownMenu
                    open={langDropdownOpen}
                    onOpenChange={setLangDropdownOpen}
                >
                    <DropdownMenuTrigger asChild>
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:border-neutral-200 hover:bg-accent dark:border-neutral-700 dark:hover:border-neutral-600">
                            <Globe className="h-4 w-4" />
                            <span className="sr-only">Language</span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuItem
                            onClick={() => {
                                // Laravel fallback first, then Google Translate
                                const langFiles = ['en', 'np'];
                                const currentLang =
                                    localStorage.getItem('app_locale') || 'en';

                                if (langFiles.includes(currentLang)) {
                                    // Switch Laravel locale
                                    window.location.href = `/lang/${currentLang === 'en' ? 'np' : 'en'}`;
                                } else {
                                    // Google Translate fallback
                                    const targetLang =
                                        currentLang === 'en' ? 'ne' : 'en';
                                    const googleUrl = `https://translate.google.com/?sl=auto&tl=${targetLang}&op=translate`;
                                    window.open(googleUrl, '_blank');
                                }

                                setLangDropdownOpen(false);
                            }}
                            className="justify-center gap-2 py-1.5"
                        >
                            🇺🇸 EN / 🇳🇵 NP
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Icon-only Dark/Light Toggle */}
                <button
                    onClick={toggleAppearance}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:border-neutral-200 hover:bg-accent data-[state=active]:bg-accent dark:border-neutral-700 dark:hover:border-neutral-600"
                    aria-label={
                        appearance === 'light'
                            ? 'Switch to dark mode'
                            : 'Switch to light mode'
                    }
                >
                    {appearance === 'light' ? (
                        <Moon className="h-4 w-4" />
                    ) : (
                        <Sun className="h-4 w-4" />
                    )}
                </button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="relative h-9 w-9 rounded-full border transition-all hover:border-neutral-200 hover:bg-accent dark:border-neutral-700 dark:hover:border-neutral-600">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={auth.user.avatar}
                                    alt={auth.user.name}
                                />
                                <AvatarFallback>
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem
                            onClick={handleViewProfile}
                            className="cursor-pointer"
                        >
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer focus:bg-destructive"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
