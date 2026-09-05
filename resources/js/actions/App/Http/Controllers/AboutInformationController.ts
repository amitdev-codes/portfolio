import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/about-informations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/about-informations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutInformationController::store
* @see app/Http/Controllers/AboutInformationController.php:26
* @route '/admin/about-informations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/about-informations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AboutInformationController::store
* @see app/Http/Controllers/AboutInformationController.php:26
* @route '/admin/about-informations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::store
* @see app/Http/Controllers/AboutInformationController.php:26
* @route '/admin/about-informations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
export const show = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/about-informations/{about_information}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
show.url = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about_information: typeof args.about_information === 'object'
        ? args.about_information.id
        : args.about_information,
    }

    return show.definition.url
            .replace('{about_information}', parsedArgs.about_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
show.get = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
show.head = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
export const edit = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/about-informations/{about_information}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
edit.url = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about_information: typeof args.about_information === 'object'
        ? args.about_information.id
        : args.about_information,
    }

    return edit.definition.url
            .replace('{about_information}', parsedArgs.about_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
edit.get = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
edit.head = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
export const update = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/about-informations/{about_information}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
update.url = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about_information: typeof args.about_information === 'object'
        ? args.about_information.id
        : args.about_information,
    }

    return update.definition.url
            .replace('{about_information}', parsedArgs.about_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
update.put = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
update.patch = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\AboutInformationController::destroy
* @see app/Http/Controllers/AboutInformationController.php:57
* @route '/admin/about-informations/{about_information}'
*/
export const destroy = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/about-informations/{about_information}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AboutInformationController::destroy
* @see app/Http/Controllers/AboutInformationController.php:57
* @route '/admin/about-informations/{about_information}'
*/
destroy.url = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { about_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { about_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            about_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        about_information: typeof args.about_information === 'object'
        ? args.about_information.id
        : args.about_information,
    }

    return destroy.definition.url
            .replace('{about_information}', parsedArgs.about_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutInformationController::destroy
* @see app/Http/Controllers/AboutInformationController.php:57
* @route '/admin/about-informations/{about_information}'
*/
destroy.delete = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const AboutInformationController = { index, create, store, show, edit, update, destroy }

export default AboutInformationController