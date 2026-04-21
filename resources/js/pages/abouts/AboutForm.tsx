import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface About {
    id?: number;
    // TODO: add your fields
}

interface Props {
    about?: About;
    mode: 'create' | 'edit';
}

export default function AboutForm({ about, mode }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm<About>({
        // TODO: initialize your fields
        ...about,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && about?.id) {
            put(route('abouts.update', about.id));
        } else {
            post(route('abouts.store'));
        }
    };

    const title = mode === 'edit' ? 'Edit About' : 'Create About';

    return (
        <>
            <Head title={title} />

            <div className="container mx-auto max-w-2xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <Link
                        href={route('abouts.index')}
                        className="text-sm text-gray-500 hover:text-gray-700 transition"
                    >
                        ← Back to list
                    </Link>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-5">

                    {/* TODO: add your form fields below */}
                    {/*
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    */}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                        <Link
                            href={route('abouts.index')}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-60 transition"
                        >
                            {processing ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}