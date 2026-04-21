import {
    LayoutGrid,
    Users,
    Shield,
    KeyRound,
    FolderKanban,
    BarChart3,
    Briefcase,
    MessageSquareText,
    FileText,
} from 'lucide-react';
import { dashboard } from '@/routes/admin';
import {index as experiencesIndex} from '@/routes/admin/experiences';
import { index as permissionsIndex } from '@/routes/admin/permissions';
import {index as portfolioInformationIndex} from '@/routes/admin/portfolio-informations';
import {index as projectsIndex} from '@/routes/admin/projects';
import { index as rolesIndex } from '@/routes/admin/roles';
import {index as statsIndex} from '@/routes/admin/stats';
import {index as techTalkIndex} from '@/routes/admin/tech-talks';
import { index as usersIndex } from '@/routes/admin/users';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'User Management',
        icon: Users,
        items: [
            { title: 'Users', href: usersIndex(), icon: Users },
            { title: 'Roles', href: rolesIndex(), icon: Shield },
            { title: 'Permissions', href: permissionsIndex(), icon: KeyRound },
        ],
    },
    {
        title: 'Portfolio Information',
        icon: FileText, // better than Users
        items: [
            {
                title: 'Portfolio Info',
                href: portfolioInformationIndex(),
                icon: FileText,
            },
            {
                title: 'Projects',
                href: projectsIndex(),
                icon: FolderKanban,
            },
            {
                title: 'Stats',
                href: statsIndex(),
                icon: BarChart3,
            },
            {
                title: 'Experiences',
                href: experiencesIndex(),
                icon: Briefcase,
            },
            {
                title: 'Tech Talks',
                href: techTalkIndex(),
                icon: MessageSquareText,
            },
        ],
    },
];
