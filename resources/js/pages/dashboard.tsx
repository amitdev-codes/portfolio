import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkers2, Clock, Calendar, Globe, Users, TrendingUp, Activity, BarChart3, PieChart, Briefcase } from 'lucide-react';

export default function Dashboard({
    visits,
    todayVisits,
    weekVisits,
    topCountries,
    projectsCount,
    techTalksCount,
    publishedTechTalksCount
}: {
    visits: number;
    todayVisits: number;
    weekVisits: number;
    topCountries: { country: string; count: number }[];
    projectsCount: number;
    techTalksCount: number;
    publishedTechTalksCount: number;
}) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Stats Row */}
                <div className="grid gap-4 md:grid-cols-4">
                    {/* Total Visits */}
                    <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Users className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Total Visits
                                    </h3>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {visits.toLocaleString()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                All-time visitor count
                            </p>
                        </CardContent>
                    </Card>

                    {/* Today's Visits */}
                    <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Clock className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Today's Visits
                                    </h3>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {todayVisits.toLocaleString()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Visitors in the last 24 hours
                            </p>
                        </CardContent>
                    </Card>

                    {/* This Week's Visits */}
                    <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        This Week
                                    </h3>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {weekVisits.toLocaleString()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Visitors in the last 7 days
                            </p>
                        </CardContent>
                    </Card>

                    {/* Projects Count */}
                    <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Briefcase className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Projects
                                    </h3>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {projectsCount.toLocaleString()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Total projects in portfolio
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Top Countries Chart */}
                    <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Top Visitor Countries
                                </h3>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
{topCountries.length > 0 ? (
    <div className="space-y-2">
        {topCountries.map((country, index) => (
            <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                    {country.country}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {country.count.toLocaleString()}
                </span>
            </div>
        ))}
    </div>
) : (
    <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
        No visitor data yet
    </p>
)}
                        </CardContent>
                    </Card>

                    {/* Content Stats */}
                    <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Content Overview
                                </h3>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        Tech Talks
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {techTalksCount} total
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        Published Tech Talks
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {publishedTechTalksCount} published
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        Projects
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {projectsCount}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Section */}
                <div className="border border-sidebar-border/70 dark:border-sidebar-border">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Recent Activity
                            </h3>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="space-y-4">
                            {/* This would ideally come from an activity log */}
                            <div className="text-center py-8">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Activity logging coming soon...
                                </p>
                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <Activity className="h-4 w-4 text-slate-400" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Visitor tracking active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </div>
        </>
    );
}
