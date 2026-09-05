import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserManagement\PermissionController::index
* @see app/Http/Controllers/UserManagement/PermissionController.php:18
* @route '/admin/permissions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::index
* @see app/Http/Controllers/UserManagement/PermissionController.php:18
* @route '/admin/permissions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::index
* @see app/Http/Controllers/UserManagement/PermissionController.php:18
* @route '/admin/permissions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::index
* @see app/Http/Controllers/UserManagement/PermissionController.php:18
* @route '/admin/permissions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::create
* @see app/Http/Controllers/UserManagement/PermissionController.php:26
* @route '/admin/permissions/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/permissions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::create
* @see app/Http/Controllers/UserManagement/PermissionController.php:26
* @route '/admin/permissions/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::create
* @see app/Http/Controllers/UserManagement/PermissionController.php:26
* @route '/admin/permissions/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::create
* @see app/Http/Controllers/UserManagement/PermissionController.php:26
* @route '/admin/permissions/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::store
* @see app/Http/Controllers/UserManagement/PermissionController.php:34
* @route '/admin/permissions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::store
* @see app/Http/Controllers/UserManagement/PermissionController.php:34
* @route '/admin/permissions'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::store
* @see app/Http/Controllers/UserManagement/PermissionController.php:34
* @route '/admin/permissions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::show
* @see app/Http/Controllers/UserManagement/PermissionController.php:73
* @route '/admin/permissions/{permission}'
*/
export const show = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/permissions/{permission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::show
* @see app/Http/Controllers/UserManagement/PermissionController.php:73
* @route '/admin/permissions/{permission}'
*/
show.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }

    return show.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::show
* @see app/Http/Controllers/UserManagement/PermissionController.php:73
* @route '/admin/permissions/{permission}'
*/
show.get = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::show
* @see app/Http/Controllers/UserManagement/PermissionController.php:73
* @route '/admin/permissions/{permission}'
*/
show.head = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::edit
* @see app/Http/Controllers/UserManagement/PermissionController.php:81
* @route '/admin/permissions/{permission}/edit'
*/
export const edit = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/permissions/{permission}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::edit
* @see app/Http/Controllers/UserManagement/PermissionController.php:81
* @route '/admin/permissions/{permission}/edit'
*/
edit.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }

    return edit.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::edit
* @see app/Http/Controllers/UserManagement/PermissionController.php:81
* @route '/admin/permissions/{permission}/edit'
*/
edit.get = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::edit
* @see app/Http/Controllers/UserManagement/PermissionController.php:81
* @route '/admin/permissions/{permission}/edit'
*/
edit.head = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::update
* @see app/Http/Controllers/UserManagement/PermissionController.php:89
* @route '/admin/permissions/{permission}'
*/
export const update = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/permissions/{permission}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::update
* @see app/Http/Controllers/UserManagement/PermissionController.php:89
* @route '/admin/permissions/{permission}'
*/
update.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }

    return update.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::update
* @see app/Http/Controllers/UserManagement/PermissionController.php:89
* @route '/admin/permissions/{permission}'
*/
update.put = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::update
* @see app/Http/Controllers/UserManagement/PermissionController.php:89
* @route '/admin/permissions/{permission}'
*/
update.patch = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::destroy
* @see app/Http/Controllers/UserManagement/PermissionController.php:105
* @route '/admin/permissions/{permission}'
*/
export const destroy = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/permissions/{permission}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::destroy
* @see app/Http/Controllers/UserManagement/PermissionController.php:105
* @route '/admin/permissions/{permission}'
*/
destroy.url = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { permission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        permission: typeof args.permission === 'object'
        ? args.permission.id
        : args.permission,
    }

    return destroy.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::destroy
* @see app/Http/Controllers/UserManagement/PermissionController.php:105
* @route '/admin/permissions/{permission}'
*/
destroy.delete = (args: { permission: number | { id: number } } | [permission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::bulkDestroy
* @see app/Http/Controllers/UserManagement/PermissionController.php:121
* @route '/admin/permissions/bulk-destroy'
*/
export const bulkDestroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkDestroy.url(options),
    method: 'post',
})

bulkDestroy.definition = {
    methods: ["post"],
    url: '/admin/permissions/bulk-destroy',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::bulkDestroy
* @see app/Http/Controllers/UserManagement/PermissionController.php:121
* @route '/admin/permissions/bulk-destroy'
*/
bulkDestroy.url = (options?: RouteQueryOptions) => {
    return bulkDestroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserManagement\PermissionController::bulkDestroy
* @see app/Http/Controllers/UserManagement/PermissionController.php:121
* @route '/admin/permissions/bulk-destroy'
*/
bulkDestroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkDestroy.url(options),
    method: 'post',
})

const PermissionController = { index, create, store, show, edit, update, destroy, bulkDestroy }

export default PermissionController