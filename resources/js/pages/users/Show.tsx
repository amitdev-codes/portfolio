import { Head, router } from '@inertiajs/react';
import { Users, Pencil } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { index, edit, update } from '@/routes/admin/users';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

const Field = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex items-center justify-between py-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
    </div>
);

const Show: React.FC<Props> = ({ user }) => {
    const breadcrumbItems = [
        { label: 'Users', href: index(), icon: Users },
        { label: 'View User', icon: Users },
    ];

    return (
        <>
            <Head title={`View ${user.name}`} />

            <Breadcrumb
                showHome
                items={breadcrumbItems}
                className="px-4 pt-4 pb-0"
            />

            <div className="flex flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>User Details</CardTitle>
                            <CardDescription>
                                Detailed information about {user.name}
                            </CardDescription>
                        </div>

                        <Button
                            onClick={() => router.get(edit(user.id))}
                            className="flex items-center gap-2"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit User
                        </Button>
                    </CardHeader>

                    <CardContent className="px-6 pb-4">
                        <div className="divide-y divide-border">
                            <Field label="User ID" value={`#${user.id}`} />
                            <Field label="Full Name" value={user.name} />
                            <Field label="Email Address" value={user.email} />
                            <Field label="Role" value={user.role} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Show;
