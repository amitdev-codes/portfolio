<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeAll extends Command
{
    protected $signature = 'make:all {name : The resource name (e.g. User or college_students)}';

    protected $description = 'Generate migration, seeder, model, requests, datatable, controller, route, and React pages for a resource';

    // ─── Derived name variants ────────────────────────────────────────────
    private string $raw;          // original input      e.g. college_students

    private string $studly;       // StudlyCase           e.g. CollegeStudent

    private string $camel;        // camelCase            e.g. collegeStudent

    private string $snake;        // snake_case singular  e.g. college_student

    private string $snakePlural;  // snake_case plural    e.g. college_students

    private string $kebab;        // kebab-case plural    e.g. college-students

    private string $title;        // Title Case           e.g. College Student

    private string $tableName;    // DB table name        e.g. college_students

    public function handle(): int
    {
        $this->raw = $this->argument('name');
        $singular = Str::singular($this->raw);          // college_student
        $this->studly = Str::studly($singular);             // CollegeStudent
        $this->camel = Str::camel($singular);              // collegeStudent
        $this->snake = Str::snake($singular);              // college_student
        $this->snakePlural = Str::snake(Str::plural($singular)); // college_students
        $this->kebab = Str::kebab(Str::plural($singular)); // college-students
        $this->title = Str::title(str_replace('_', ' ', $singular)); // College Student
        $this->tableName = $this->snakePlural;

        $this->info("🚀 Generating all files for: <comment>{$this->studly}</comment>");
        $this->newLine();

        $this->makeMigration();
        $this->makeModel();
        $this->makeSeeder();
        $this->makeStoreRequest();
        $this->makeUpdateRequest();
        $this->makeDataTable();
        $this->makeController();
        $this->appendRoute();
        $this->makeIndexPage();
        $this->makeFormPage();

        $this->newLine();
        $this->info('✅  All files generated successfully!');
        $this->table(
            ['File', 'Path'],
            $this->generatedFiles()
        );

        return self::SUCCESS;
    }

    // ─── 1. Migration ─────────────────────────────────────────────────────
    private function makeMigration(): void
    {
        $timestamp = now()->format('Y_m_d_His');
        $fileName = "{$timestamp}_create_{$this->tableName}_table.php";
        $path = database_path("migrations/{$fileName}");

        $stub = <<<PHP
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('{$this->tableName}', function (Blueprint \$table) {
            \$table->id();
            // TODO: add your columns here
            \$table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('{$this->tableName}');
    }
};
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> Migration  → database/migrations/{$fileName}");
    }

    // ─── 2. Model ─────────────────────────────────────────────────────────
    private function makeModel(): void
    {
        $path = app_path("Models/{$this->studly}.php");
        $this->ensureDirectory(app_path('Models'));

        $stub = <<<PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$this->studly} extends Model
{
    use HasFactory;

    protected \$table = '{$this->tableName}';

    protected \$fillable = [
        // TODO: list your fillable columns
    ];
}
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> Model      → app/Models/{$this->studly}.php");
    }

    // ─── 3. Seeder ────────────────────────────────────────────────────────
    private function makeSeeder(): void
    {
        $seeder = "{$this->studly}Seeder";
        $path = database_path("seeders/{$seeder}.php");

        $stub = <<<PHP
<?php

namespace Database\Seeders;

use App\Models\\{$this->studly};
use Illuminate\Database\Seeder;

class {$seeder} extends Seeder
{
    public function run(): void
    {
        // {$this->studly}::factory()->count(10)->create();
    }
}
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> Seeder     → database/seeders/{$seeder}.php");
    }

    // ─── 4. Store Request ─────────────────────────────────────────────────
    private function makeStoreRequest(): void
    {
        $class = "Store{$this->studly}Request";
        $dir = app_path("Http/Requests/{$this->studly}");
        $path = "{$dir}/{$class}.php";
        $this->ensureDirectory($dir);

        $stub = <<<PHP
<?php

namespace App\Http\Requests\\{$this->studly};

use Illuminate\Foundation\Http\FormRequest;

class {$class} extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // TODO: add validation rules
        ];
    }
}
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> Request    → app/Http/Requests/{$this->studly}/{$class}.php");
    }

    // ─── 5. Update Request ────────────────────────────────────────────────
    private function makeUpdateRequest(): void
    {
        $class = "Update{$this->studly}Request";
        $dir = app_path("Http/Requests/{$this->studly}");
        $path = "{$dir}/{$class}.php";
        $this->ensureDirectory($dir);

        $stub = <<<PHP
<?php

namespace App\Http\Requests\\{$this->studly};

use Illuminate\Foundation\Http\FormRequest;

class {$class} extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // TODO: add validation rules
        ];
    }
}
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> Request    → app/Http/Requests/{$this->studly}/{$class}.php");
    }

    // ─── 6. DataTable ─────────────────────────────────────────────────────
    private function makeDataTable(): void
    {
        $class = "{$this->studly}DataTable";
        $dir = app_path('DataTables');
        $path = "{$dir}/{$class}.php";
        $this->ensureDirectory($dir);

        $stub = <<<PHP
<?php

namespace App\DataTables;

use App\Models\\{$this->studly};
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class {$class} extends DataTable
{
    public function dataTable(QueryBuilder \$query): EloquentDataTable
    {
        return (new EloquentDataTable(\$query))
            ->addColumn('action', function ({$this->studly} \$row) {
                return view('components.datatable-actions', [
                    'editUrl'   => route('{$this->snakePlural}.edit', \$row),
                    'deleteUrl' => route('{$this->snakePlural}.destroy', \$row),
                ])->render();
            })
            ->setRowId('id')
            ->rawColumns(['action']);
    }

    public function query({$this->studly} \$model): QueryBuilder
    {
        return \$model->newQuery();
    }

    public function html(): HtmlBuilder
    {
        return \$this->builder()
            ->setTableId('{$this->snakePlural}-table')
            ->columns(\$this->getColumns())
            ->minifiedAjax()
            ->orderBy(0)
            ->buttons([Button::make('reload')]);
    }

    public function getColumns(): array
    {
        return [
            Column::make('id'),
            // TODO: add your columns
            Column::computed('action')
                  ->exportable(false)
                  ->printable(false)
                  ->addClass('text-center'),
        ];
    }

    protected function filename(): string
    {
        return '{$this->studly}_' . date('YmdHis');
    }
}
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> DataTable  → app/DataTables/{$class}.php");
    }

    // ─── 7. Resource Controller ───────────────────────────────────────────
    private function makeController(): void
    {
        $class = "{$this->studly}Controller";
        $dtClass = "{$this->studly}DataTable";
        $storeReq = "Store{$this->studly}Request";
        $updateReq = "Update{$this->studly}Request";
        $dir = app_path('Http/Controllers');
        $path = "{$dir}/{$class}.php";

        $stub = <<<PHP
<?php

namespace App\Http\Controllers;

use App\DataTables\\{$dtClass};
use App\Http\Requests\\{$this->studly}\\{$storeReq};
use App\Http\Requests\\{$this->studly}\\{$updateReq};
use App\Models\\{$this->studly};
use Illuminate\Http\Request;

class {$class} extends Controller
{
    public function index(Request $request)
    {

    $resource = $this->snakePlural;

    // Convert to StudlyCase for class name
    $class = str_replace(' ', '', ucwords(str_replace('-', ' ', $resource)));
    $dataTableClass = "App\\DataTables\\{$class}DataTable";

    return Inertia::render(
        "{$resource}/Index",
        (new $dataTableClass($request))->response()
    );
    }

    public function create()
    {
        return view('{$this->snakePlural}.create');
    }

    public function store({$storeReq} \$request)
    {
        {$this->studly}::create(\$request->validated());

        return redirect()
            ->route('{$this->snakePlural}.index')
            ->with('success', '{$this->title} created successfully.');
    }

    public function show({$this->studly} \${$this->camel})
    {
        return view('{$this->snakePlural}.show', compact('{$this->camel}'));
    }

    public function edit({$this->studly} \${$this->camel})
    {
        return view('{$this->snakePlural}.edit', compact('{$this->camel}'));
    }

    public function update({$updateReq} \$request, {$this->studly} \${$this->camel})
    {
        \${$this->camel}->update(\$request->validated());

        return redirect()
            ->route('{$this->snakePlural}.index')
            ->with('success', '{$this->title} updated successfully.');
    }

    public function destroy({$this->studly} \${$this->camel})
    {
        \${$this->camel}->delete();

        return redirect()
            ->route('{$this->snakePlural}.index')
            ->with('success', '{$this->title} deleted successfully.');
    }
}
PHP;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> Controller → app/Http/Controllers/{$class}.php");
    }

    // ─── 8. Route ─────────────────────────────────────────────────────────
    private function appendRoute(): void
    {
        $routeFile = base_path('routes/web.php');
        $controller = "{$this->studly}Controller";
        $entry = "\nRoute::resource('{$this->snakePlural}', \\App\\Http\\Controllers\\{$controller}::class);";

        $contents = File::get($routeFile);

        if (str_contains($contents, "Route::resource('{$this->snakePlural}'")) {
            $this->line('  <fg=yellow>SKIPPED</>  Route      → already exists in routes/web.php');

            return;
        }

        File::append($routeFile, $entry);
        $this->line('  <fg=green>APPENDED</> Route      → routes/web.php');
    }

    // ─── 9. React Index Page ──────────────────────────────────────────────
    private function makeIndexPage(): void
    {
        // e.g. resources/js/pages/college_students/index.tsx
        $dir = resource_path("js/pages/{$this->snakePlural}");
        $path = "{$dir}/index.tsx";
        $this->ensureDirectory($dir);

        $formComponent = "{$this->studly}Form";

        $stub = <<<TSX
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface {$this->studly} {
    id: number;
    // TODO: add your fields
    created_at: string;
    updated_at: string;
}

interface Props {
    {$this->camel}s: {
        data: {$this->studly}[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function {$this->studly}Index({ {$this->camel}s }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        router.delete(route('{$this->snakePlural}.destroy', id));
    };

    return (
        <>
            <Head title="{$this->title} List" />

            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{$this->title}s</h1>
                    <Link
                        href={route('{$this->snakePlural}.create')}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition"
                    >
                        + New {$this->title}
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
                            {{$this->camel}s.data.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                {$this->camel}s.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-sm text-gray-700">{item.id}</td>
                                        {/* TODO: add columns */}
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('{$this->snakePlural}.edit', item.id)}
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
                    {{$this->camel}s.links.map((link, i) => (
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
TSX;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> React      → resources/js/pages/{$this->snakePlural}/index.tsx");
    }

    // ─── 10. React Form Page ──────────────────────────────────────────────
    private function makeFormPage(): void
    {
        $formComponent = "{$this->studly}Form";
        $dir = resource_path("js/pages/{$this->snakePlural}");
        $path = "{$dir}/{$formComponent}.tsx";
        $this->ensureDirectory($dir);

        $stub = <<<TSX
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface {$this->studly} {
    id?: number;
    // TODO: add your fields
}

interface Props {
    {$this->camel}?: {$this->studly};
    mode: 'create' | 'edit';
}

export default function {$formComponent}({ {$this->camel}, mode }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm<{$this->studly}>({
        // TODO: initialize your fields
        ...{$this->camel},
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && {$this->camel}?.id) {
            put(route('{$this->snakePlural}.update', {$this->camel}.id));
        } else {
            post(route('{$this->snakePlural}.store'));
        }
    };

    const title = mode === 'edit' ? 'Edit {$this->title}' : 'Create {$this->title}';

    return (
        <>
            <Head title={title} />

            <div className="container mx-auto max-w-2xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <Link
                        href={route('{$this->snakePlural}.index')}
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
                            href={route('{$this->snakePlural}.index')}
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
TSX;

        File::put($path, $stub);
        $this->line("  <fg=green>CREATED</> React      → resources/js/pages/{$this->snakePlural}/{$formComponent}.tsx");
    }

    // ─── Helpers ──────────────────────────────────────────────────────────
    private function ensureDirectory(string $path): void
    {
        if (! File::isDirectory($path)) {
            File::makeDirectory($path, 0755, true);
        }
    }

    private function generatedFiles(): array
    {
        return [
            ['Migration',   "database/migrations/..._create_{$this->tableName}_table.php"],
            ['Model',       "app/Models/{$this->studly}.php"],
            ['Seeder',      "database/seeders/{$this->studly}Seeder.php"],
            ['StoreRequest', "app/Http/Requests/{$this->studly}/Store{$this->studly}Request.php"],
            ['UpdateRequest', "app/Http/Requests/{$this->studly}/Update{$this->studly}Request.php"],
            ['DataTable',   "app/DataTables/{$this->studly}DataTable.php"],
            ['Controller',  "app/Http/Controllers/{$this->studly}Controller.php"],
            ['Route',       'routes/web.php (appended)'],
            ['Index Page',  "resources/js/pages/{$this->snakePlural}/index.tsx"],
            ['Form Page',   "resources/js/pages/{$this->snakePlural}/{$this->studly}Form.tsx"],
        ];
    }
}
