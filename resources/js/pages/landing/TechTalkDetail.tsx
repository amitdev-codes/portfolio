import { Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, ExternalLink, User } from 'lucide-react';


interface CodeExample {
    id: number;
    title: string | null;
    language: string;
    code: string;
    explanation: string | null;
}

interface Screenshot {
    id: number;
    url: string;
    caption: string | null;
}

interface TechTalkDetail {
    id: number;
    number: string;
    slug: string;
    category: string;
    categoryColor: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    date: string | null;
    readTime: string | null;
    coverImage: string | null;
    videoLink: string | null;
    sourceLink: string | null;
    authorName: string | null;
    codeExamples: CodeExample[];
    screenshots: Screenshot[];
}

export default function TechTalkDetail({ techTalk }: { techTalk: TechTalkDetail }) {
    return (
        <div className="min-h-screen bg-[#f8f7f4] font-sans text-slate-900">
            <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
                <Link
                    href="/#blog"
                    className="mb-10 inline-flex items-center gap-1 text-sm font-bold text-indigo-600"
                >
                    <ArrowLeft size={16} /> Back to Tech Talks
                </Link>

                <span
                    className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                        backgroundColor: `${techTalk.categoryColor}1f`,
                        color: techTalk.categoryColor,
                    }}
                >
                    {techTalk.category}
                </span>

                <h1 className="text-4xl leading-tight font-black text-slate-900 sm:text-5xl">
                    {techTalk.title}
                </h1>

                {techTalk.excerpt && (
                    <p className="mt-4 text-lg leading-relaxed text-slate-500">
                        {techTalk.excerpt}
                    </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-b border-slate-200 py-4 text-sm font-semibold text-slate-500">
                    {techTalk.authorName && (
                        <span className="flex items-center gap-1.5">
                            <User size={14} /> {techTalk.authorName}
                        </span>
                    )}
                    {techTalk.date && (
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} /> {techTalk.date}
                        </span>
                    )}
                    {techTalk.readTime && (
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} /> {techTalk.readTime} read
                        </span>
                    )}
                </div>

                {techTalk.videoLink && (
                    <a
                        href={techTalk.videoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
                    >
                        Watch the talk <ExternalLink size={14} />
                    </a>
                )}

                {techTalk.content && (
                    <div className="prose prose-slate mt-10 max-w-none whitespace-pre-wrap">
                        {techTalk.content}
                    </div>
                )}

                {techTalk.codeExamples.length > 0 && (
                    <div className="mt-12">
                        <h2 className="mb-6 text-2xl font-black text-slate-900">
                            Code Examples
                        </h2>
                        <div className="space-y-8">
                            {techTalk.codeExamples.map((example) => (
                                <div key={example.id}>
                                    {example.title && (
                                        <h3 className="mb-2 text-sm font-bold text-slate-700">
                                            {example.title}
                                        </h3>
                                    )}
                                    <pre className="overflow-x-auto rounded-2xl bg-[#18181f] p-5 text-sm leading-relaxed text-slate-100">
                                        <code>{example.code}</code>
                                    </pre>
                                    {example.explanation && (
                                        <p className="mt-2 text-sm text-slate-500">
                                            {example.explanation}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {techTalk.screenshots.length > 0 && (
                    <div className="mt-12">
                        <h2 className="mb-6 text-2xl font-black text-slate-900">
                            Screenshots
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {techTalk.screenshots.map((shot) => (
                                <figure key={shot.id}>
                                    <img
                                        src={shot.url}
                                        alt={shot.caption ?? ''}
                                        className="w-full rounded-2xl border border-slate-200"
                                    />
                                    {shot.caption && (
                                        <figcaption className="mt-2 text-xs text-slate-500">
                                            {shot.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </div>
                )}

                {techTalk.sourceLink && (
                    <a
                        href={techTalk.sourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-12 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600"
                    >
                        View source / slides <ExternalLink size={14} />
                    </a>
                )}
            </div>
        </div>
    );
}
