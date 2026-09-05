import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ExperienceController::index
* @see app/Http/Controllers/ExperienceController.php:14
* @route '/admin/experiences'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/experiences',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExperienceController::index
* @see app/Http/Controllers/ExperienceController.php:14
* @route '/admin/experiences'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::index
* @see app/Http/Controllers/ExperienceController.php:14
* @route '/admin/experiences'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExperienceController::index
* @see app/Http/Controllers/ExperienceController.php:14
* @route '/admin/experiences'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExperienceController::create
* @see app/Http/Controllers/ExperienceController.php:19
* @route '/admin/experiences/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/experiences/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExperienceController::create
* @see app/Http/Controllers/ExperienceController.php:19
* @route '/admin/experiences/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::create
* @see app/Http/Controllers/ExperienceController.php:19
* @route '/admin/experiences/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExperienceController::create
* @see app/Http/Controllers/ExperienceController.php:19
* @route '/admin/experiences/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExperienceController::store
* @see app/Http/Controllers/ExperienceController.php:24
* @route '/admin/experiences'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/experiences',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExperienceController::store
* @see app/Http/Controllers/ExperienceController.php:24
* @route '/admin/experiences'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::store
* @see app/Http/Controllers/ExperienceController.php:24
* @route '/admin/experiences'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ExperienceController::show
* @see app/Http/Controllers/ExperienceController.php:40
* @route '/admin/experiences/{experience}'
*/
export const show = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/experiences/{experience}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExperienceController::show
* @see app/Http/Controllers/ExperienceController.php:40
* @route '/admin/experiences/{experience}'
*/
show.url = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { experience: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { experience: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            experience: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        experience: typeof args.experience === 'object'
        ? args.experience.id
        : args.experience,
    }

    return show.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::show
* @see app/Http/Controllers/ExperienceController.php:40
* @route '/admin/experiences/{experience}'
*/
show.get = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExperienceController::show
* @see app/Http/Controllers/ExperienceController.php:40
* @route '/admin/experiences/{experience}'
*/
show.head = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExperienceController::edit
* @see app/Http/Controllers/ExperienceController.php:45
* @route '/admin/experiences/{experience}/edit'
*/
export const edit = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/experiences/{experience}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExperienceController::edit
* @see app/Http/Controllers/ExperienceController.php:45
* @route '/admin/experiences/{experience}/edit'
*/
edit.url = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { experience: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { experience: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            experience: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        experience: typeof args.experience === 'object'
        ? args.experience.id
        : args.experience,
    }

    return edit.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::edit
* @see app/Http/Controllers/ExperienceController.php:45
* @route '/admin/experiences/{experience}/edit'
*/
edit.get = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExperienceController::edit
* @see app/Http/Controllers/ExperienceController.php:45
* @route '/admin/experiences/{experience}/edit'
*/
edit.head = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExperienceController::update
* @see app/Http/Controllers/ExperienceController.php:50
* @route '/admin/experiences/{experience}'
*/
export const update = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/experiences/{experience}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ExperienceController::update
* @see app/Http/Controllers/ExperienceController.php:50
* @route '/admin/experiences/{experience}'
*/
update.url = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { experience: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { experience: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            experience: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        experience: typeof args.experience === 'object'
        ? args.experience.id
        : args.experience,
    }

    return update.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::update
* @see app/Http/Controllers/ExperienceController.php:50
* @route '/admin/experiences/{experience}'
*/
update.put = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ExperienceController::update
* @see app/Http/Controllers/ExperienceController.php:50
* @route '/admin/experiences/{experience}'
*/
update.patch = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ExperienceController::destroy
* @see app/Http/Controllers/ExperienceController.php:71
* @route '/admin/experiences/{experience}'
*/
export const destroy = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/experiences/{experience}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ExperienceController::destroy
* @see app/Http/Controllers/ExperienceController.php:71
* @route '/admin/experiences/{experience}'
*/
destroy.url = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { experience: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { experience: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            experience: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        experience: typeof args.experience === 'object'
        ? args.experience.id
        : args.experience,
    }

    return destroy.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExperienceController::destroy
* @see app/Http/Controllers/ExperienceController.php:71
* @route '/admin/experiences/{experience}'
*/
destroy.delete = (args: { experience: number | { id: number } } | [experience: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ExperienceController = { index, create, store, show, edit, update, destroy }

export default ExperienceController