import type { ImgHTMLAttributes } from 'react';

const PROFILE_LOGO = '/images/profileimage.png';

export default function AppLogoIcon({
    className,
    alt = 'Logo',
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={PROFILE_LOGO}
            alt={alt}
            className={`rounded-full object-cover ${className ?? ''}`}
            {...props}
        />
    );
}
