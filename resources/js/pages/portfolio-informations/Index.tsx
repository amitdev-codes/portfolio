import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import DataTable from '@/components/DataTable';
import type { ColumnConfig } from '@/components/DataTable';
import {
    show,
    edit,
    create,
    destroy,
} from '@/routes/admin/portfolio-informations';

type PortfolioInformation = {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    address: string;
    latitude: string;
    longitude: string;
    phone_number: string;
    mobile_number: string;
    cv_link: string;
    linkedin_link: string;
    github_link: string;
    website_link: string;
    small_description: string | null;
    description: string;
    seo_title: string;
    seo_metatags: string;
    profile_image: string;
    cover_image: string;
    created_at: string;
};

interface PageProps {
    PortfolioInformation: PortfolioInformation[];
    // roles: string[];
    pagination?: {
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
        from: number | null;
        to: number | null;
    };
    filters?: { search?: string; filters?: Record<string, string> };
}

export default function Index({ PortfolioInformation }: PageProps) {
    const columns: ColumnConfig<PortfolioInformation>[] = [
        {
            key: 'id',
            header: 'ID',
            size: 56,
            sortable: true,
            filterable: false,
            muted: true,
        },
        {
            key: 'first_name',
            header: 'First Name',
            sortable: false,
            filterable: false,
        },
        {
            key: 'middle_name',
            header: 'Middle Name',
            sortable: false,
            filterable: false,
        },
        {
            key: 'last_name',
            header: 'Last Name',
            sortable: false,
            filterable: false,
        },
        {
            key: 'email',
            header: 'Email',
            sortable: true,
            filterable: true,
            filterPlaceholder: 'Search email…',
        },
        {
            key: 'address',
            header: 'Address',
            sortable: false,
            filterable: false,
        },
        {
            key: 'latitude',
            header: 'Latitude',
            sortable: false,
            filterable: false,
        },
        {
            key: 'longitude',
            header: 'Longitude',
            sortable: false,
            filterable: false,
        },
        {
            key: 'small_description',
            header: 'Description',
            sortable: false,
            filterable: false,
        },
        {
            key: 'created_at',
            header: 'Joined',
            size: 130,
            sortable: false,
            filterable: false,
        },
    ];

    console.log(PortfolioInformation);

    return (
        <>
            <Breadcrumb
                items={[{ label: 'PortFolioInformation', icon: Users }]}
            />
            <Head title="PortFolioInformation" />

            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto p-4">
                <DataTable
                    columnConfigs={columns}
                    columns={columns}
                    data={PortfolioInformation ?? []}
                    title="List PortFolio Information"
                    createRoute={create}
                    showRoute={show}
                    editRoute={edit}
                    destroyRoute={destroy}
                />
            </div>
        </>
    );
}
