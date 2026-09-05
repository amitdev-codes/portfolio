import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::index
* @see app/Http/Controllers/StatController.php:14
* @route '/admin/stats'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/stats/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::create
* @see app/Http/Controllers/StatController.php:19
* @route '/admin/stats/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\StatController::store
* @see app/Http/Controllers/StatController.php:24
* @route '/admin/stats'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/stats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StatController::store
* @see app/Http/Controllers/StatController.php:24
* @route '/admin/stats'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::store
* @see app/Http/Controllers/StatController.php:24
* @route '/admin/stats'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StatController::store
* @see app/Http/Controllers/StatController.php:24
* @route '/admin/stats'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StatController::store
* @see app/Http/Controllers/StatController.php:24
* @route '/admin/stats'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
export const show = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/stats/{stat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
show.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { stat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            stat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stat: typeof args.stat === 'object'
        ? args.stat.id
        : args.stat,
    }

    return show.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
show.get = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
show.head = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
const showForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
showForm.get = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::show
* @see app/Http/Controllers/StatController.php:33
* @route '/admin/stats/{stat}'
*/
showForm.head = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
export const edit = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/stats/{stat}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
edit.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { stat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            stat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stat: typeof args.stat === 'object'
        ? args.stat.id
        : args.stat,
    }

    return edit.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
edit.get = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
edit.head = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
const editForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
editForm.get = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatController::edit
* @see app/Http/Controllers/StatController.php:38
* @route '/admin/stats/{stat}/edit'
*/
editForm.head = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
export const update = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/stats/{stat}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
update.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { stat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            stat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stat: typeof args.stat === 'object'
        ? args.stat.id
        : args.stat,
    }

    return update.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
update.put = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
update.patch = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
const updateForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
updateForm.put = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StatController::update
* @see app/Http/Controllers/StatController.php:43
* @route '/admin/stats/{stat}'
*/
updateForm.patch = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\StatController::destroy
* @see app/Http/Controllers/StatController.php:52
* @route '/admin/stats/{stat}'
*/
export const destroy = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/stats/{stat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StatController::destroy
* @see app/Http/Controllers/StatController.php:52
* @route '/admin/stats/{stat}'
*/
destroy.url = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { stat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            stat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stat: typeof args.stat === 'object'
        ? args.stat.id
        : args.stat,
    }

    return destroy.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatController::destroy
* @see app/Http/Controllers/StatController.php:52
* @route '/admin/stats/{stat}'
*/
destroy.delete = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\StatController::destroy
* @see app/Http/Controllers/StatController.php:52
* @route '/admin/stats/{stat}'
*/
const destroyForm = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StatController::destroy
* @see app/Http/Controllers/StatController.php:52
* @route '/admin/stats/{stat}'
*/
destroyForm.delete = (args: { stat: number | { id: number } } | [stat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const StatController = { index, create, store, show, edit, update, destroy }

export default StatController