import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/abouts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::index
* @see app/Http/Controllers/AboutController.php:12
* @route '/admin/abouts'
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
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/abouts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::create
* @see app/Http/Controllers/AboutController.php:17
* @route '/admin/abouts/create'
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
* @see \App\Http\Controllers\AboutController::store
* @see app/Http/Controllers/AboutController.php:22
* @route '/admin/abouts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/abouts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AboutController::store
* @see app/Http/Controllers/AboutController.php:22
* @route '/admin/abouts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::store
* @see app/Http/Controllers/AboutController.php:22
* @route '/admin/abouts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutController::store
* @see app/Http/Controllers/AboutController.php:22
* @route '/admin/abouts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutController::store
* @see app/Http/Controllers/AboutController.php:22
* @route '/admin/abouts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
export const show = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/abouts/{about}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
show.url = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about: typeof args.about === 'object'
        ? args.about.id
        : args.about,
    }

    return show.definition.url
            .replace('{about}', parsedArgs.about.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
show.get = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
show.head = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
const showForm = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
showForm.get = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::show
* @see app/Http/Controllers/AboutController.php:31
* @route '/admin/abouts/{about}'
*/
showForm.head = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
export const edit = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/abouts/{about}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
edit.url = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about: typeof args.about === 'object'
        ? args.about.id
        : args.about,
    }

    return edit.definition.url
            .replace('{about}', parsedArgs.about.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
edit.get = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
edit.head = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
const editForm = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
editForm.get = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutController::edit
* @see app/Http/Controllers/AboutController.php:36
* @route '/admin/abouts/{about}/edit'
*/
editForm.head = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
export const update = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/abouts/{about}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
update.url = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about: typeof args.about === 'object'
        ? args.about.id
        : args.about,
    }

    return update.definition.url
            .replace('{about}', parsedArgs.about.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
update.put = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
update.patch = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
const updateForm = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
updateForm.put = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutController::update
* @see app/Http/Controllers/AboutController.php:41
* @route '/admin/abouts/{about}'
*/
updateForm.patch = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\AboutController::destroy
* @see app/Http/Controllers/AboutController.php:50
* @route '/admin/abouts/{about}'
*/
export const destroy = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/abouts/{about}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AboutController::destroy
* @see app/Http/Controllers/AboutController.php:50
* @route '/admin/abouts/{about}'
*/
destroy.url = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about: typeof args.about === 'object'
        ? args.about.id
        : args.about,
    }

    return destroy.definition.url
            .replace('{about}', parsedArgs.about.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutController::destroy
* @see app/Http/Controllers/AboutController.php:50
* @route '/admin/abouts/{about}'
*/
destroy.delete = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\AboutController::destroy
* @see app/Http/Controllers/AboutController.php:50
* @route '/admin/abouts/{about}'
*/
const destroyForm = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutController::destroy
* @see app/Http/Controllers/AboutController.php:50
* @route '/admin/abouts/{about}'
*/
destroyForm.delete = (args: { about: number | { id: number } } | [about: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const abouts = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default abouts