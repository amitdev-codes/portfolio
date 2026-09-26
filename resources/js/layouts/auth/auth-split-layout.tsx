import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';

const HERO_IMAGE =
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-dvh grid-cols-1 lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
            {/* Left — image panel */}
            <div className="relative hidden lg:flex">
                <img
                    src={HERO_IMAGE}
                    alt="Developer workspace"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 via-fuchsia-800/85 to-indigo-900/90" />
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative flex h-full flex-col justify-between p-12 text-white">
                    <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-1 ring-white/25">
                            <AppLogoIcon className="h-11 w-11" alt={String(name ?? 'Logo')} />
                        </div>
                        {name}
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold leading-tight">
                            Manage your portfolio with a beautiful admin dashboard.
                        </h2>
                        <p className="mt-4 text-white/80">
                            Sign in to manage projects, experiences, blogs and messages — all in one place.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 text-sm text-white/85">
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Secure authentication for admin access
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                Modern, fast & distraction-free workflow
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-white/60">
                        © {new Date().getFullYear()} {name}. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Right — form panel (vertically & horizontally centered) */}
            <div className="flex min-h-dvh items-center justify-center overflow-y-auto bg-background px-6 py-10 sm:px-10 lg:min-h-0 lg:h-full lg:px-14">
                <div className="my-auto w-full max-w-md">
                    <div className="mb-8 text-center">
                        {/*<h1 className="text-2xl font-bold text-foreground">{name}</h1>*/}
                        {/*<p className="mt-1 text-sm text-muted-foreground">PortFolio</p>*/}
                    </div>

                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-bold text-foreground">{title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-8 shadow-xl sm:p-10">
                        {children}
                    </div>

                    <p className="mt-6 text-center text-xs text-muted-foreground">
                        © {new Date().getFullYear()} {name}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
