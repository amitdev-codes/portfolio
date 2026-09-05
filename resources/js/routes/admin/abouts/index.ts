import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
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