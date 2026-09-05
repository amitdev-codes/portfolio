import { Head } from '@inertiajs/react';
import { Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import { show, edit, create, destroy } from '@/routes/admin/about-informations';

type AboutInformation = {
    id: number;
    section_label: string | null;
    heading_main: string | null;
    heading_highlight: string | null;
    experience_heading: string | null;
    tech_stack_label: string | null;
    is_active: boolean;
    created_at: string;
};

interface PageProps {
    // ⚠️ Must match AboutInformationDataTable's protected string $dataKey = 'AboutInformation';
    AboutInformation: AboutInformation[];
    pagination?: any;
    filters?: any;
}

export default function Index({
    AboutInformation: aboutInformation,
}: PageProps) {
    const columns: ColumnConfig<AboutInformation>[] = [
        {
            key: 'id',
            header: 'ID',
            size: 60,
            sortable: true,
            muted: true,
        },
        {
            key: 'section_label',
            header: 'Section Label',
            sortable: true,
        },
        {
            key: 'heading_main',
            header: 'Heading',
            render: (row?: AboutInformation) =>
                row ? (
                    <div>
                        {row.heading_main}{' '}
                        <span className="font-medium text-blue-600">
                            {row.heading_highlight}
                        </span>
                    </div>
                ) : null,
        },
        {
            key: 'experience_heading',
            header: 'Experience Heading',
        },
        {
            key: 'tech_stack_label',
            header: 'Tech Stack Label',
        },
        {
            key: 'is_active',
            header: 'Status',
            render: (row?: AboutInformation) =>
                row ? (
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            row.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {row.is_active ? 'Active' : 'Inactive'}
                    </span>
                ) : null,
            size: 100,
        },
        {
            key: 'created_at',
            header: 'Created At',
            size: 140,
        },
    ];

    return (
        <>
            <Breadcrumb items={[{ label: 'About Information', icon: Info }]} />
            <Head title="About Information" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={aboutInformation ?? []}
                    title="About Information"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
