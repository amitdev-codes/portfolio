<?php

namespace App\DataTables;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class BaseDataTable
{
    protected Request $request;

    protected array $allowedPerPage = [10, 15, 25, 50, 100];

    protected int $defaultPerPage = 15;

    protected string $dataKey = 'data';

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    // ── Abstract — each DataTable must define these ───────────────────────────

    abstract protected function query(): Builder;

    abstract protected function searchableColumns(): array;

    abstract protected function filterableColumns(): array;

    abstract protected function transform($row): array;

    // ── Optional overrides ────────────────────────────────────────────────────

    protected function filterHandlers(): array
    {
        return [];
    }

    public function extraProps(): array
    {
        return [];
    }

    // ── Pipeline ──────────────────────────────────────────────────────────────

    public function response(): array
    {
        $query = $this->query();
        $query = $this->applySearch($query);
        $query = $this->applyFilters($query);

        $paginator = $query
            ->latest()
            ->paginate($this->resolvedPerPage())
            ->through(fn ($row) => $this->transform($row));

        return array_merge([
            $this->dataKey => $paginator->items(), // ← was hardcoded 'data'
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'last_page' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
            'filters' => $this->request->only(['search', 'filters']),
        ], $this->extraProps());
    }

    // ── Internals ─────────────────────────────────────────────────────────────

    private function applySearch(Builder $query): Builder
    {
        if ($search = $this->request->get('search')) {
            $query->where(function ($q) use ($search) {
                foreach ($this->searchableColumns() as $column) {
                    $q->orWhere($column, 'LIKE', "%{$search}%");
                }
            });
        }

        return $query;
    }

    private function applyFilters(Builder $query): Builder
    {
        $handlers = $this->filterHandlers();
        $allowed = $this->filterableColumns();

        foreach ($this->request->get('filters', []) as $column => $value) {
            if (! $value) {
                continue;
            }

            if (isset($handlers[$column])) {
                $query = $handlers[$column]($query, $value);

                continue;
            }

            if (in_array($column, $allowed)) {
                $query->where($column, 'LIKE', "%{$value}%");
            }
        }

        return $query;
    }

    private function resolvedPerPage(): int
    {
        $requested = (int) $this->request->get('per_page', $this->defaultPerPage);

        return in_array($requested, $this->allowedPerPage)
            ? $requested
            : $this->defaultPerPage;
    }
}
