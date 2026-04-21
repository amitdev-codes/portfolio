import type { BreadcrumbItem } from '@/components/Breadcrumb';
import Breadcrumb from '@/components/Breadcrumb';
import type { RouteDefinition } from '@/wayfinder';

interface BreadcrumbDynamicProps<T extends { id?: number }> {
    modelName: string;
    model?: T;
    indexRoute: RouteDefinition<'get'>;
    editRoute?: RouteDefinition<'put'>;
    items?: BreadcrumbItem[];
}

export function BreadcrumbDynamic<T extends { id?: number }>({
    modelName,
    model,
    indexRoute,
    editRoute,
    items,
}: BreadcrumbDynamicProps<T>) {
    const defaultItems: BreadcrumbItem[] = [
        {
            label: modelName,
            href: indexRoute,
            icon: undefined as any,
        },
        ...(model
            ? [
                  {
                      label: 'Edit',
                      href: editRoute || indexRoute,
                      icon: undefined as any,
                  },
              ]
            : [{ label: 'Create', href: indexRoute, icon: undefined as any }]),
    ];

    return <Breadcrumb showHome items={items || defaultItems} />;
}
