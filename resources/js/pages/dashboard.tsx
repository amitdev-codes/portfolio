import { Head } from '@inertiajs/react';
import {
    Briefcase,
    Calendar,
    Clock,
    MessageSquareText,
    Users,
} from 'lucide-react';
import BarChart from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import PieChart from '@/components/charts/PieChart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type ChartItem = { name: string; value: number };

type Charts = {
    contentOverview: ChartItem[];
    projects: ChartItem[];
    techTalks: ChartItem[];
    visitors: ChartItem[];
    skills: ChartItem[];
    techStack: ChartItem[];
    countries: ChartItem[];
};

const STAT_CARDS = [
    {
        key: 'visits',
        label: 'Total Visits',
        hint: 'All-time visitor count',
        icon: Users,
        accent: 'bg-muted text-foreground',
        valueClass: 'text-foreground',
    },
    {
        key: 'today',
        label: "Today's Visits",
        hint: 'Last 24 hours',
        icon: Clock,
        accent: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
        valueClass: 'text-sky-700 dark:text-sky-300',
    },
    {
        key: 'week',
        label: 'This Week',
        hint: 'Last 7 days',
        icon: Calendar,
        accent: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        valueClass: 'text-emerald-700 dark:text-emerald-300',
    },
    {
        key: 'projects',
        label: 'Projects',
        hint: 'Portfolio projects',
        icon: Briefcase,
        accent: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
        valueClass: 'text-amber-700 dark:text-amber-300',
    },
] as const;

export default function Dashboard({
    visits,
    todayVisits,
    weekVisits,
    projectsCount,
    techTalksCount,
    publishedTechTalksCount,
    experiencesCount,
    charts,
}: {
    visits: number;
    todayVisits: number;
    weekVisits: number;
    projectsCount: number;
    techTalksCount: number;
    publishedTechTalksCount: number;
    experiencesCount: number;
    charts: Charts;
}) {
    const values = {
        visits,
        today: todayVisits,
        week: weekVisits,
        projects: projectsCount,
    };

    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-6 bg-background p-4 text-foreground">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {STAT_CARDS.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card
                                key={card.key}
                                className="border-border bg-card text-card-foreground shadow-none"
                            >
                                <CardContent className="flex items-start justify-between gap-3 p-5">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {card.label}
                                        </p>
                                        <p className={`mt-2 text-3xl font-semibold tracking-tight ${card.valueClass}`}>
                                            {values[card.key].toLocaleString()}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {card.key === 'projects'
                                                ? `${experiencesCount} experiences · ${publishedTechTalksCount}/${techTalksCount} talks`
                                                : card.hint}
                                        </p>
                                    </div>
                                    <div className={`rounded-lg p-2.5 ${card.accent}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {[
                        {
                            title: 'Content Overview',
                            description: 'Projects, talks, experiences & stats',
                            chart: <BarChart data={charts.contentOverview} />,
                        },
                        {
                            title: 'Visitor Breakdown',
                            description: 'Today, week, month & older visits',
                            chart: <BarChart data={charts.visitors} />,
                        },
                        {
                            title: 'Skills & Tech Stack',
                            description: 'Technologies used across projects',
                            chart: (
                                <BarChart
                                    data={charts.skills.length ? charts.skills : charts.techStack}
                                    emptyLabel="No skills or tech data yet"
                                />
                            ),
                        },
                        {
                            title: 'Top Visitor Countries',
                            description: 'Last 30 days by country',
                            chart: (
                                <BarChart
                                    data={charts.countries}
                                    emptyLabel="No visitor country data yet"
                                />
                            ),
                        },
                    ].map((section) => (
                        <Card
                            key={section.title}
                            className="border-border bg-card text-card-foreground shadow-none"
                        >
                            <CardHeader className="pb-2">
                                <h3 className="text-base font-semibold text-foreground">
                                    {section.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {section.description}
                                </p>
                            </CardHeader>
                            <CardContent>{section.chart}</CardContent>
                        </Card>
                    ))}

                    <Card className="border-border bg-card text-card-foreground shadow-none">
                        <CardHeader className="pb-2">
                            <h3 className="text-base font-semibold text-foreground">
                                Projects
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Featured vs regular projects
                            </p>
                        </CardHeader>
                        <CardContent>
                            <DonutChart data={charts.projects} />
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card text-card-foreground shadow-none">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <MessageSquareText className="h-4 w-4 text-muted-foreground" />
                                <h3 className="text-base font-semibold text-foreground">
                                    Tech Talks
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Published vs draft talks
                            </p>
                        </CardHeader>
                        <CardContent>
                            <PieChart data={charts.techTalks} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
