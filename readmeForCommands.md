# scaffold
# Full CRUD (Model + Controller + Requests)
php artisan make:crud User

# Skip model (table exists, just scaffold)
php artisan make:crud User --no-model

# API-only (for API routes)
php artisan make:crud Post --api