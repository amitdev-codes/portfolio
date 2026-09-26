import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import type { NavItem } from '@/types';

export const footerNavItems: NavItem[] = [
    {
        title: 'GitHub',
        href: 'https://github.com/amitkumardev',
        icon: Github,
    },
    {
        title: 'LinkedIn',
        href: 'https://linkedin.com/in/amitkumardev',
        icon: Linkedin,
    },
    {
        title: 'Twitter',
        href: 'https://twitter.com/amitkumardev',
        icon: Twitter,
    },
    {
        title: 'Email',
        href: 'mailto:amit@amitkumar.dev',
        icon: Mail,
    },
];
