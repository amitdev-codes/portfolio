import { router } from '@inertiajs/react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import type {
    ColumnDef,
    SortingState,
    RowSelectionState,
} from '@tanstack/react-table';
import {
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
    Search,
    Plus,
    Download,
    Filter,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Trash2,
    Eye,
    Pencil,
    FileDown,
    FileText,
    Printer,
} from 'lucide-react';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type ColumnConfig<TData> = {
    key: keyof TData & string;
    header: string;
    size?: number;
    sortable?: boolean;
    filterable?: boolean;
    filterVariant?: 'text' | 'select';
    filterOptions?: Array<{ label: string; value: string }>;
    filterPlaceholder?: string;
    badge?: {
        variant?:
            | 'default'
            | 'secondary'
            | 'outline'
            | 'destructive'
            | 'primary';
        color?: string;
        truthy?: string;
        falsy?: string;
        map?: Record<string, { label: string; color?: string }>;
    };
    tags?: boolean;
    muted?: boolean;
    render?: (value: any, row: TData) => React.ReactNode;
};

export interface PaginationMeta {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
}

export interface NavItem {
    label: string;
    href?: string;
    active?: boolean;
}

// ─── Modal Mode Types ─────────────────────────────────────────────────────────
export type ModalMode = 'create' | 'edit' | 'show';

export interface ModalState<TData> {
    mode: ModalMode;
    item?: TData;
}

export interface DataTableProps<TData extends { id: number | string }> {
    columns: ColumnDef<TData>[];
    columnConfigs?: ColumnConfig<TData>[];
    data: TData[];
    title?: string;
    navItems?: NavItem[];

    // Routes (used when modal=false)
    createRoute?: () => string;
    showRoute?: (id: number | string) => string;
    editRoute?: (id: number | string) => string;
    destroyRoute?: (id: number | string) => string;
    bulkDestroyRoute?: () => string;
    exportRoutes?: {
        excel?: string;
        csv?: string;
        pdf?: string;
    };

    // ── Modal Mode ────────────────────────────────────────────────────────────
    /**
     * When true, clicking Create / Edit opens a modal instead of navigating.
     * Supply `renderCreateModal` and/or `renderEditModal` to provide form content.
     */
    useModal?: boolean;
    /**
     * Renders the body of the Create modal.
     * Receives `onClose` — call it to dismiss the modal.
     */
    renderCreateModal?: (onClose: () => void) => React.ReactNode;
    /**
     * Renders the body of the Edit modal.
     * Receives the row `item` and `onClose`.
     */
    renderEditModal?: (item: TData, onClose: () => void) => React.ReactNode;
    /**
     * Renders the body of the Show / View modal.
     * Receives the row `item` and `onClose`.
     */
    renderShowModal?: (item: TData, onClose: () => void) => React.ReactNode;

    // Labels
    createLabel?: string;
    bulkDeleteLabel?: string;

    // Data
    pagination?: PaginationMeta;
    initialSearch?: string;
    initialPerPage?: number;
    initialColumnFilters?: Record<string, string>;
    searchableColumns?: string[];
}

const PER_PAGE_OPTIONS = [10, 15, 25, 50, 100];

// ─── Auto Column Builder ──────────────────────────────────────────────────────
function buildColumns<TData>(
    configs: ColumnConfig<TData>[],
): ColumnDef<TData>[] {
    return configs.map((cfg) => ({
        accessorKey: cfg.key,
        header: cfg.header,
        size: cfg.size,
        enableSorting: cfg.sortable ?? true,
        enableColumnFilter: cfg.filterable ?? false,
        meta: {
            filterVariant: cfg.filterVariant ?? 'text',
            options: cfg.filterOptions ?? [],
            filterPlaceholder: cfg.filterPlaceholder ?? `Search ${cfg.header}…`,
        },
        cell: ({ row }: { row: any }) => {
            const value = row.original[cfg.key];

            if (cfg.render) return cfg.render(value, row.original);

            if (cfg.badge?.truthy !== undefined) {
                return value ? (
                    <Badge className="hover:bg-primary-600 bg-primary px-1.5 py-0 text-[11px] dark:bg-emerald-700">
                        {cfg.badge.truthy}
                    </Badge>
                ) : (
                    <Badge
                        variant="outline"
                        className="border-amber-300 bg-amber-50 px-1.5 py-0 text-[11px] text-amber-600 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                    >
                        {cfg.badge.falsy ?? 'No'}
                    </Badge>
                );
            }

            if (cfg.tags) {
                return (
                    <div className="flex flex-wrap gap-1">
                        {value ? (
                            String(value)
                                .split(',')
                                .map((v: string) => (
                                    <Badge
                                        key={v.trim()}
                                        variant="secondary"
                                        className="px-1.5 py-0 text-[11px] capitalize"
                                    >
                                        {v.trim()}
                                    </Badge>
                                ))
                        ) : (
                            <Badge
                                variant="outline"
                                className="px-1.5 py-0 text-[11px] text-muted-foreground"
                            >
                                No role
                            </Badge>
                        )}
                    </div>
                );
            }

            if (cfg.muted) {
                return (
                    <span className="text-[11px] text-muted-foreground tabular-nums">
                        {value}
                    </span>
                );
            }

            return value ?? '—';
        },
    }));
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
function useDebounce<T>(value: T, delay = 380): T {
    const [d, setD] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setD(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return d;
}

// ─── DataTable ────────────────────────────────────────────────────────────────
export default function ModalDataTable<TData extends { id: number | string }>({
    columnConfigs,
    columns,
    data,
    title,
    navItems,
    createRoute,
    showRoute,
    editRoute,
    destroyRoute,
    bulkDestroyRoute,
    exportRoutes,
    useModal = false,
    renderCreateModal,
    renderEditModal,
    renderShowModal,
    createLabel = 'Add New',
    bulkDeleteLabel = 'Delete Selected',
    pagination,
    initialSearch = '',
    initialPerPage,
    initialColumnFilters = {},
    searchableColumns = [],
}: DataTableProps<TData>) {
    // ── State ──────────────────────────────────────────────────────────────────
    const [search, setSearch] = useState(initialSearch);
    const [colFilters, setColFilters] =
        useState<Record<string, string>>(initialColumnFilters);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selection, setSelection] = useState<RowSelectionState>({});
    const [showFilters, setShowFilters] = useState(() =>
        Object.values(initialColumnFilters).some(Boolean),
    );
    const [perPage, setPerPage] = useState(
        initialPerPage ?? pagination?.per_page ?? 15,
    );
    const [deleteTarget, setDeleteTarget] = useState<TData | null>(null);
    const [bulkIds, setBulkIds] = useState<(number | string)[]>([]);
    const [showExportDropdown, setShowExportDropdown] = useState(false);

    // ── Modal state ────────────────────────────────────────────────────────────
    const [modalState, setModalState] = useState<ModalState<TData> | null>(
        null,
    );

    const openCreateModal = useCallback(
        () => setModalState({ mode: 'create' }),
        [],
    );
    const openEditModal = useCallback(
        (item: TData) => setModalState({ mode: 'edit', item }),
        [],
    );
    const openShowModal = useCallback(
        (item: TData) => setModalState({ mode: 'show', item }),
        [],
    );
    const closeModal = useCallback(() => setModalState(null), []);

    const debouncedSearch = useDebounce(search);
    const debouncedFilters = useDebounce(colFilters, 420);
    const mounted = useRef(false);

    // ── Server sync ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;

            return;
        }

        router.get(
            window.location.pathname,
            {
                ...(debouncedSearch ? { search: debouncedSearch } : {}),
                ...(Object.keys(debouncedFilters).length
                    ? { filters: debouncedFilters }
                    : {}),
                per_page: perPage,
                page: 1,
            },
            { preserveState: true, replace: true },
        );
    }, [debouncedSearch, debouncedFilters, perPage]);

    // ── Actions ────────────────────────────────────────────────────────────────
    const confirmSingleDelete = useCallback(
        (item: TData) => {
            router.delete(destroyRoute!(item.id as any), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`"${(item as any).name || 'Item'}" deleted.`);
                    setDeleteTarget(null);
                },
                onError: () => {
                    toast.error('Delete failed.');
                    setDeleteTarget(null);
                },
            });
        },
        [destroyRoute],
    );

    const confirmBulkDelete = useCallback(() => {
        router.post(
            bulkDestroyRoute!(),
            { ids: bulkIds },
            {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    toast.success(`${bulkIds.length} items deleted.`);
                    setBulkIds([]);
                    setSelection({});
                },
                onError: () => {
                    toast.error('Bulk delete failed.');
                    setBulkIds([]);
                },
            },
        );
    }, [bulkDestroyRoute, bulkIds]);

    // ── Filter Components ──────────────────────────────────────────────────────
    const TextFilter = ({
        key,
        placeholder,
    }: {
        key: string;
        placeholder: string;
    }) => (
        <div className="relative h-6">
            <Input
                value={colFilters[key] ?? ''}
                onChange={(e) =>
                    setColFilters((p) => ({ ...p, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="h-6 border border-input bg-background pr-6 pl-7 text-xs hover:border-ring hover:bg-accent focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Search className="pointer-events-none absolute top-1.5 left-1.5 h-3 w-3 text-muted-foreground" />
            {colFilters[key] && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0.5 right-0.5 h-5 w-5 p-0"
                    onClick={() =>
                        setColFilters((p) => {
                            const n = { ...p };
                            delete n[key];

                            return n;
                        })
                    }
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
        </div>
    );

    const SelectFilter = ({
        key,
        options,
        placeholder,
    }: {
        key: string;
        options: Array<{ label: string; value: string }>;
        placeholder: string;
    }) => (
        <Select
            value={colFilters[key] ?? 'all'}
            onValueChange={(val) =>
                setColFilters((p) => ({
                    ...p,
                    [key]: val === 'all' ? '' : val,
                }))
            }
        >
            <SelectTrigger className="h-6 w-full border border-input bg-background text-xs hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full">
                <SelectItem value="all" className="text-xs">
                    All
                </SelectItem>
                {options.map((opt) => (
                    <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-xs"
                    >
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );

    const resolvedColumns = useMemo(
        () => (columnConfigs ? buildColumns(columnConfigs) : (columns ?? [])),
        [columnConfigs, columns],
    );

    // ── Checkbox column ────────────────────────────────────────────────────────
    const checkboxCol: ColumnDef<TData> = {
        id: '__select',
        enableSorting: false,
        enableColumnFilter: false,
        size: 40,
        header: ({ table }) => (
            <Checkbox
                className="border-2 [border-color:var(--checkbox-border)] data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary/50"
                checked={
                    table.getIsAllPageRowsSelected()
                        ? true
                        : table.getIsSomePageRowsSelected()
                          ? 'indeterminate'
                          : false
                }
                onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="border-2 [border-color:var(--checkbox-border)] data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary/50"
                checked={row.getIsSelected()}
                onCheckedChange={(v) => row.toggleSelected(!!v)}
                aria-label="Select row"
                onClick={(e) => e.stopPropagation()}
            />
        ),
    };

    // ── Actions column — respects modal vs route mode ──────────────────────────
    const hasActions =
        (showRoute || (useModal && renderShowModal)) &&
        (editRoute || (useModal && renderEditModal)) &&
        destroyRoute;

    const actionsCol: ColumnDef<TData> | null = hasActions
        ? {
              id: 'actions',
              header: 'Actions',
              enableSorting: false,
              enableColumnFilter: false,
              size: 96,
          }
        : null;

    const allColumns = [
        checkboxCol,
        ...resolvedColumns,
        ...(actionsCol ? [actionsCol] : []),
    ];

    const table = useReactTable({
        data,
        columns: allColumns,
        state: { sorting, rowSelection: selection },
        onSortingChange: setSorting,
        onRowSelectionChange: setSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: pagination?.last_page ?? 1,
        getRowId: (row) => String(row.id),
    });

    // ── Derived ────────────────────────────────────────────────────────────────
    const selectedIds = Object.keys(selection)
        .filter((k) => selection[k])
        .map(Number);
    const hasSelection = selectedIds.length > 0;
    const hasActiveFilters =
        !!search || Object.values(colFilters).some(Boolean);
    const filterCount = Object.values(colFilters).filter(Boolean).length;
    const hasExport =
        exportRoutes &&
        (exportRoutes.excel || exportRoutes.csv || exportRoutes.pdf);

    // ── Pagination pills ───────────────────────────────────────────────────────
    const pageButtons: number[] = (() => {
        if (!pagination) {
            return [];
        }

        const { last_page: last, current_page: cur } = pagination;

        const inner: number[] = [];

        for (let i = Math.max(1, cur - 2); i <= Math.min(last, cur + 2); i++)
            inner.push(i);

        const out: number[] = [];

        if (inner[0] > 1) {
            out.push(1);

            if (inner[0] > 2) {
                out.push(-1);
            }
        }
        inner.forEach((p) => out.push(p));

        const tail = inner[inner.length - 1];

        if (tail < last) {
            if (tail < last - 1) {
                out.push(-1);
            }

            out.push(last);
        }

        return out;
    })();

    // ── Helpers ────────────────────────────────────────────────────────────────
    const goToPage = useCallback(
        (page: number) =>
            router.get(
                window.location.pathname,
                {
                    page,
                    per_page: perPage,
                    ...(search ? { search } : {}),
                    ...(Object.keys(colFilters).length
                        ? { filters: colFilters }
                        : {}),
                },
                { preserveState: true, replace: true },
            ),
        [search, colFilters, perPage],
    );

    const clearAll = useCallback(() => {
        setSearch('');
        setColFilters({});
    }, []);
    const handleBulkDelete = useCallback(() => {
        setBulkIds(selectedIds);
    }, [selectedIds]);

    // ── Handle create button ───────────────────────────────────────────────────
    const handleCreate = useCallback(() => {
        if (useModal && renderCreateModal) {
            openCreateModal();
        } else if (createRoute) {
            router.visit(createRoute());
        }
    }, [useModal, renderCreateModal, createRoute, openCreateModal]);

    // ── Handle show/edit ───────────────────────────────────────────────────────
    const handleShow = useCallback(
        (item: TData) => {
            if (useModal && renderShowModal) {
                openShowModal(item);
            } else if (showRoute) {
                router.visit(showRoute(item.id as any));
            }
        },
        [useModal, renderShowModal, showRoute, openShowModal],
    );

    const handleEdit = useCallback(
        (item: TData) => {
            if (useModal && renderEditModal) {
                openEditModal(item);
            } else if (editRoute) {
                router.visit(editRoute(item.id as any));
            }
        },
        [useModal, renderEditModal, editRoute, openEditModal],
    );

    // ── Modal title helper ─────────────────────────────────────────────────────
    const modalTitle =
        modalState?.mode === 'create'
            ? `Add ${title?.replace('List ', '') ?? 'Item'}`
            : modalState?.mode === 'edit'
              ? `Edit ${(modalState?.item && (modalState.item as any)?.name) ?? 'Item'}`
              : `View ${(modalState?.item && (modalState.item as any)?.name) ?? 'Item'}`;

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <>
            <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                {/* ── CARD HEADER ──────────────────────────────────────────────── */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/20 px-4 py-2.5 dark:bg-muted/10">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                        {title && (
                            <span className="text-sm font-semibold whitespace-nowrap text-foreground">
                                {title}
                            </span>
                        )}
                        {navItems && navItems.length > 0 && (
                            <>
                                {title && (
                                    <span className="text-border select-none">
                                        |
                                    </span>
                                )}
                                <nav className="flex flex-wrap items-center gap-0.5">
                                    {navItems.map((item, i) => (
                                        <span
                                            key={i}
                                            className="flex items-center gap-0.5"
                                        >
                                            {i > 0 && (
                                                <span className="px-0.5 text-muted-foreground/30 select-none">
                                                    /
                                                </span>
                                            )}
                                            {item.href && !item.active ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        router.visit(item.href!)
                                                    }
                                                    className="rounded px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                                >
                                                    {item.label}
                                                </button>
                                            ) : (
                                                <span
                                                    className={cn(
                                                        'rounded px-1.5 py-0.5 text-xs font-medium',
                                                        item.active
                                                            ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                                            : 'text-muted-foreground',
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </nav>
                            </>
                        )}
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-1.5">
                        {hasExport && (
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="relative h-7 gap-1 px-2.5 text-xs"
                                    onClick={() =>
                                        setShowExportDropdown((v) => !v)
                                    }
                                >
                                    <Download className="h-3 w-3" />
                                    Export
                                    <ChevronDown
                                        className={cn(
                                            'ml-1 h-3 w-3 transition-transform',
                                            showExportDropdown && 'rotate-180',
                                        )}
                                    />
                                </Button>
                                {showExportDropdown && (
                                    <div className="absolute top-full right-0 z-50 mt-1 min-w-[140px] animate-in rounded-lg border border-border bg-background shadow-lg duration-200 fade-in-0 slide-in-from-top-2">
                                        {exportRoutes?.excel && (
                                            <a
                                                href={exportRoutes.excel}
                                                className="flex items-center gap-2 rounded-t-lg border-b border-border/50 px-3 py-2 text-xs hover:bg-accent"
                                            >
                                                <FileDown className="h-3 w-3" />{' '}
                                                Excel
                                            </a>
                                        )}
                                        {exportRoutes?.csv && (
                                            <a
                                                href={exportRoutes.csv}
                                                className="flex items-center gap-2 border-b border-border/50 px-3 py-2 text-xs last:border-b-0 hover:bg-accent"
                                            >
                                                <FileText className="h-3 w-3" />{' '}
                                                CSV
                                            </a>
                                        )}
                                        {exportRoutes?.pdf && (
                                            <a
                                                href={exportRoutes.pdf}
                                                className="flex items-center gap-2 border-b border-border/50 px-3 py-2 text-xs last:rounded-b-lg last:border-b-0 hover:bg-accent"
                                            >
                                                <FileText className="h-3 w-3" />{' '}
                                                PDF
                                            </a>
                                        )}
                                        <button
                                            onClick={() => window.print()}
                                            className="flex w-full items-center gap-2 rounded-b-lg px-3 py-2 text-left text-xs hover:bg-accent"
                                        >
                                            <Printer className="h-3 w-3" />{' '}
                                            Print
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {(createRoute || (useModal && renderCreateModal)) && (
                            <Button
                                size="sm"
                                className="h-7 gap-1 px-2.5 text-xs"
                                onClick={handleCreate}
                            >
                                <Plus className="h-3 w-3" />
                                {createLabel}
                            </Button>
                        )}
                    </div>
                </div>

                {/* ── TOOLBAR ──────────────────────────────────────────────────── */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2 dark:bg-background">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                            Show
                        </span>
                        <Select
                            value={String(perPage)}
                            onValueChange={(v) => {
                                setPerPage(Number(v));
                                setSelection({});
                            }}
                        >
                            <SelectTrigger className="h-7 w-[62px] border border-input bg-background px-2 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PER_PAGE_OPTIONS.map((n) => (
                                    <SelectItem
                                        key={n}
                                        value={String(n)}
                                        className="text-xs"
                                    >
                                        {n}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-xs text-muted-foreground">
                            entries
                        </span>

                        {searchableColumns.length > 0 && (
                            <Button
                                variant={showFilters ? 'secondary' : 'outline'}
                                size="sm"
                                className="ml-1 h-7 gap-1 px-2.5 text-xs"
                                onClick={() => setShowFilters((v) => !v)}
                            >
                                <Filter className="h-3 w-3" />
                                Filter
                                {filterCount > 0 && (
                                    <span className="rounded-full bg-primary px-1.5 text-[9px] leading-4 text-primary-foreground">
                                        {filterCount}
                                    </span>
                                )}
                            </Button>
                        )}

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
                                onClick={clearAll}
                            >
                                <X className="h-3 w-3" /> Clear
                            </Button>
                        )}
                    </div>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        {hasSelection && destroyRoute && bulkDestroyRoute && (
                            <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 animate-in gap-1 px-2.5 text-xs whitespace-nowrap duration-150 fade-in slide-in-from-right-1"
                                onClick={handleBulkDelete}
                            >
                                <Trash2 className="h-3 w-3" />
                                {bulkDeleteLabel} ({selectedIds.length})
                            </Button>
                        )}

                        <div className="relative w-full sm:w-60">
                            <Search className="pointer-events-none absolute top-1.5 left-2.5 h-3.5 w-3.5 text-muted-foreground" />
                            <Input
                                placeholder="Search all columns…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-7 border border-input bg-background pr-8 pl-9 text-xs hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            {search && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-0.5 -right-0.5 h-6 w-6 p-0"
                                    onClick={() => setSearch('')}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── TABLE ────────────────────────────────────────────────────── */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((hg) => (
                                <TableRow
                                    key={hg.id}
                                    className="bg-muted/30 hover:bg-muted/30 dark:bg-muted/20"
                                >
                                    {hg.headers.map((header) => {
                                        const isCheck =
                                            header.column.id === '__select';
                                        const canSort =
                                            header.column.getCanSort();
                                        const sorted =
                                            header.column.getIsSorted();
                                        return (
                                            <TableHead
                                                key={header.id}
                                                style={{
                                                    width:
                                                        header.getSize() !== 150
                                                            ? header.getSize()
                                                            : undefined,
                                                }}
                                                className={cn(
                                                    'h-9 px-3 text-[11px] font-semibold tracking-wide uppercase',
                                                    'whitespace-nowrap text-muted-foreground select-none',
                                                    isCheck && 'w-10 px-2',
                                                    canSort &&
                                                        !isCheck &&
                                                        'cursor-pointer transition-colors hover:text-foreground',
                                                )}
                                                onClick={
                                                    canSort && !isCheck
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                            >
                                                <div className="flex items-center gap-1">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {canSort && !isCheck && (
                                                        <span className="text-muted-foreground/40">
                                                            {sorted ===
                                                            'asc' ? (
                                                                <ChevronUp className="h-3 w-3 text-primary" />
                                                            ) : sorted ===
                                                              'desc' ? (
                                                                <ChevronDown className="h-3 w-3 text-primary" />
                                                            ) : (
                                                                <ChevronsUpDown className="h-3 w-3 opacity-40" />
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}

                            {/* ── Column Filter Row ────────────────────────────────── */}
                            {showFilters && (
                                <TableRow className="border-t border-dashed border-border bg-muted/10 hover:bg-muted/10 dark:bg-muted/5">
                                    {table
                                        .getHeaderGroups()[0]
                                        ?.headers.map((header) => {
                                            const key = (
                                                header.column.columnDef as any
                                            ).accessorKey as string | undefined;
                                            const filterable =
                                                key &&
                                                searchableColumns.includes(key);
                                            const meta = header.column.columnDef
                                                .meta as any;
                                            const variant =
                                                meta?.filterVariant ?? 'text';
                                            const options = meta?.options ?? [];
                                            const ph =
                                                meta?.filterPlaceholder ??
                                                `Filter ${header.column.columnDef.header ?? key}…`;
                                            return (
                                                <TableHead
                                                    key={header.id}
                                                    className="h-12 px-2 py-1.5"
                                                >
                                                    {filterable && key ? (
                                                        variant === 'select' ? (
                                                            <SelectFilter
                                                                key={key}
                                                                options={
                                                                    options
                                                                }
                                                                placeholder={`All ${header.column.columnDef.header}`}
                                                            />
                                                        ) : (
                                                            <TextFilter
                                                                key={key}
                                                                placeholder={ph}
                                                            />
                                                        )
                                                    ) : (
                                                        <div className="h-6" />
                                                    )}
                                                </TableHead>
                                            );
                                        })}
                                </TableRow>
                            )}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={allColumns.length}
                                        className="h-28 text-center text-sm text-muted-foreground"
                                    >
                                        No results found.
                                        {hasActiveFilters && (
                                            <button
                                                onClick={clearAll}
                                                className="ml-1.5 text-primary hover:underline"
                                            >
                                                Clear filters
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected()
                                                ? 'selected'
                                                : undefined
                                        }
                                        className={cn(
                                            'transition-colors hover:bg-muted/20 dark:hover:bg-muted/10',
                                            row.getIsSelected() &&
                                                'bg-primary/5 dark:bg-primary/10',
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            if (
                                                cell.column.id === 'actions' &&
                                                hasActions
                                            ) {
                                                const item = row.original;
                                                return (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="px-3 py-2 text-sm"
                                                    >
                                                        <TooltipProvider
                                                            delayDuration={300}
                                                        >
                                                            <div className="flex items-center gap-1">
                                                                {/* View */}
                                                                {(showRoute ||
                                                                    (useModal &&
                                                                        renderShowModal)) && (
                                                                    <Tooltip>
                                                                        <TooltipTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="outline"
                                                                                size="icon"
                                                                                className="hover:border-success-300 border-success-200 text-success-600 h-7 w-7 hover:bg-green-50 hover:text-green-700 dark:border-green-800 dark:text-green-400 dark:hover:border-green-700 dark:hover:bg-green-950/40"
                                                                                onClick={() =>
                                                                                    handleShow(
                                                                                        item,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Eye className="h-3.5 w-3.5" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent
                                                                            side="top"
                                                                            className="text-xs"
                                                                        >
                                                                            View
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                )}

                                                                {/* Edit */}
                                                                {(editRoute ||
                                                                    (useModal &&
                                                                        renderEditModal)) && (
                                                                    <Tooltip>
                                                                        <TooltipTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="outline"
                                                                                size="icon"
                                                                                className="h-7 w-7 border-violet-200 text-violet-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-violet-800 dark:text-violet-400 dark:hover:border-violet-700 dark:hover:bg-violet-950/40"
                                                                                onClick={() =>
                                                                                    handleEdit(
                                                                                        item,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Pencil className="h-3.5 w-3.5" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent
                                                                            side="top"
                                                                            className="text-xs"
                                                                        >
                                                                            Edit
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                )}

                                                                {/* Delete */}
                                                                {destroyRoute && (
                                                                    <Tooltip>
                                                                        <TooltipTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="outline"
                                                                                size="icon"
                                                                                className="h-7 w-7 border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-950/40"
                                                                                onClick={() =>
                                                                                    setDeleteTarget(
                                                                                        item,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Trash2 className="h-3.5 w-3.5" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent
                                                                            side="top"
                                                                            className="text-xs"
                                                                        >
                                                                            Delete
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                )}
                                                            </div>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                );
                                            }

                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    className={cn(
                                                        'px-3 py-2 text-sm',
                                                        cell.column.id ===
                                                            '__select' &&
                                                            'w-10 px-2',
                                                    )}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* ── FOOTER ───────────────────────────────────────────────────── */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/10 px-4 py-2.5 dark:bg-muted/5">
                    <div className="flex items-center gap-2.5">
                        <p className="text-xs text-muted-foreground">
                            {pagination ? (
                                <>
                                    Showing{' '}
                                    <span className="font-medium text-foreground">
                                        {pagination.from ?? 0}
                                    </span>
                                    –
                                    <span className="font-medium text-foreground">
                                        {pagination.to ?? 0}
                                    </span>
                                    {' of '}
                                    <span className="font-medium text-foreground">
                                        {pagination.total}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="font-medium text-foreground">
                                        {data.length}
                                    </span>{' '}
                                    entries
                                </>
                            )}
                        </p>
                    </div>

                    {pagination && pagination.last_page > 1 && (
                        <div className="flex items-center gap-0.5">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={pagination.current_page === 1}
                                onClick={() => goToPage(1)}
                            >
                                <ChevronsLeft className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={pagination.current_page === 1}
                                onClick={() =>
                                    goToPage(pagination.current_page - 1)
                                }
                            >
                                <ChevronLeft className="h-3.5 w-3.5" />
                            </Button>
                            {pageButtons.map((p, i) =>
                                p === -1 ? (
                                    <span
                                        key={`e${i}`}
                                        className="px-1 text-xs text-muted-foreground select-none"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <Button
                                        key={p}
                                        variant={
                                            p === pagination.current_page
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="icon"
                                        className="h-7 w-7 text-xs"
                                        onClick={() => goToPage(p)}
                                    >
                                        {p}
                                    </Button>
                                ),
                            )}
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={
                                    pagination.current_page ===
                                    pagination.last_page
                                }
                                onClick={() =>
                                    goToPage(pagination.current_page + 1)
                                }
                            >
                                <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                disabled={
                                    pagination.current_page ===
                                    pagination.last_page
                                }
                                onClick={() => goToPage(pagination.last_page)}
                            >
                                <ChevronsRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Single Delete Dialog ──────────────────────────────────────────────── */}
            <Dialog
                open={!!deleteTarget}
                onOpenChange={(o) => !o && setDeleteTarget(null)}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Item</DialogTitle>
                        <DialogDescription>
                            Permanently delete{' '}
                            <span className="font-semibold text-foreground">
                                {deleteTarget
                                    ? (deleteTarget as any).name ||
                                      `Item ${deleteTarget.id}`
                                    : 'this item'}
                            </span>
                            ? This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteTarget(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                                deleteTarget &&
                                confirmSingleDelete(deleteTarget)
                            }
                        >
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Bulk Delete Dialog ────────────────────────────────────────────────── */}
            <Dialog
                open={bulkIds.length > 0}
                onOpenChange={(o) => !o && setBulkIds([])}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete {bulkIds.length} Items</DialogTitle>
                        <DialogDescription>
                            Permanently delete{' '}
                            <span className="font-semibold text-foreground">
                                {bulkIds.length} selected items
                            </span>
                            ? This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setBulkIds([])}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={confirmBulkDelete}
                        >
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete{' '}
                            {bulkIds.length}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Create / Edit / Show Modal ────────────────────────────────────────── */}
            <Dialog
                open={!!modalState}
                onOpenChange={(o) => !o && closeModal()}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{modalTitle}</DialogTitle>
                    </DialogHeader>

                    {modalState?.mode === 'create' &&
                        renderCreateModal?.(closeModal)}
                    {modalState?.mode === 'edit' &&
                        modalState.item &&
                        renderEditModal?.(modalState.item, closeModal)}
                    {modalState?.mode === 'show' &&
                        modalState.item &&
                        renderShowModal?.(modalState.item, closeModal)}
                </DialogContent>
            </Dialog>
        </>
    );
}
