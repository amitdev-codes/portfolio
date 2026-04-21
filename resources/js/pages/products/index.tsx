import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface Product {
    id: number;
    // TODO: add your fields
    created_at: string;
    updated_at: string;
}

interface Props {
    products: {
        data: Product[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function ProductIndex({ products }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        router.delete(route('products.destroy', id));
    };

    return (
        <>
            <Head title="Product List" />

            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition"
                    >
                        + New Product
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">ID</th>
                                {/* TODO: add column headers */}
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Created</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.data.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                products.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-sm text-gray-700">{item.id}</td>
                                        {/* TODO: add columns */}
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('products.edit', item.id)}
                                                    className="rounded bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex gap-1">
                    {products.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={[
                                'rounded border px-3 py-1 text-sm',
                                link.active
                                    ? 'border-indigo-500 bg-indigo-500 text-white'
                                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50',
                                !link.url ? 'pointer-events-none opacity-40' : '',
                            ].join(' ')}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}