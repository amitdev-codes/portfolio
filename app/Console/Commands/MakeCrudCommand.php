<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class MakeCrudCommand extends Command
{
    protected $signature = 'make:crud {name : Model name (e.g., User)} {--no-model : Skip model generation} {--api : Generate API resource only}';

    protected $description = 'Generate Model + Resource Controller + Store/Update Requests (no migration)';

    public function handle()
    {
        $model = Str::studly(class_basename($this->argument('name')));
        $modelPlural = Str::plural(Str::snake($model));
        $controller = $model.'Controller';

        $this->info("🚀 Generating CRUD for {$model}...");

        // 1. Model (always, unless --no-model)
        if (! $this->option('no-model')) {
            $this->call('make:model', ['name' => $model]);
            $this->info("✅ Model: app/Models/{$model}.php");
        }

        // 2. Resource Controller
        $this->call('make:controller', ['name' => $controller, '--resource' => true]);
        $this->info("✅ Controller: app/Http/Controllers/{$controller}.php");

        // 3. Store Request
        $this->call('make:request', ['name' => "{$model}StoreRequest"]);
        $this->info("✅ Store Request: app/Http/Requests/{$model}StoreRequest.php");

        // 4. Update Request
        $this->call('make:request', ['name' => "{$model}UpdateRequest"]);
        $this->info("✅ Update Request: app/Http/Requests/{$model}UpdateRequest.php");

        // 5. Auto-add resource route (optional)
        $this->addResourceRoute($modelPlural, $controller);

        $this->info("🎉 CRUD generated! Run: php artisan route:list | grep {$modelPlural}");
        $this->warn("💡 Add fillable to {$model} model & validation rules to Requests");
    }

    protected function addResourceRoute($plural, $controller)
    {
        $routeFile = base_path('routes/web.php');
        $route = "Route::resource('{$plural}', {$controller}::class);";

        if (! Str::contains(file_get_contents($routeFile), $route)) {
            file_put_contents($routeFile, "\n{$route}\n", FILE_APPEND | LOCK_EX);
            $this->info("✅ Route added: Route::resource('{$plural}', {$controller}::class);");
        }
    }
}
