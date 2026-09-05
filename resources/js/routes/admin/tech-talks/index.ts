import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TechTalkController::index
* @see app/Http/Controllers/TechTalkController.php:14
* @route '/admin/tech-talks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tech-talks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechTalkController::index
* @see app/Http/Controllers/TechTalkController.php:14
* @route '/admin/tech-talks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::index
* @see app/Http/Controllers/TechTalkController.php:14
* @route '/admin/tech-talks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TechTalkController::index
* @see app/Http/Controllers/TechTalkController.php:14
* @route '/admin/tech-talks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TechTalkController::create
* @see app/Http/Controllers/TechTalkController.php:19
* @route '/admin/tech-talks/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tech-talks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechTalkController::create
* @see app/Http/Controllers/TechTalkController.php:19
* @route '/admin/tech-talks/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::create
* @see app/Http/Controllers/TechTalkController.php:19
* @route '/admin/tech-talks/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TechTalkController::create
* @see app/Http/Controllers/TechTalkController.php:19
* @route '/admin/tech-talks/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TechTalkController::store
* @see app/Http/Controllers/TechTalkController.php:24
* @route '/admin/tech-talks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tech-talks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TechTalkController::store
* @see app/Http/Controllers/TechTalkController.php:24
* @route '/admin/tech-talks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::store
* @see app/Http/Controllers/TechTalkController.php:24
* @route '/admin/tech-talks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TechTalkController::show
* @see app/Http/Controllers/TechTalkController.php:42
* @route '/admin/tech-talks/{tech_talk}'
*/
export const show = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/tech-talks/{tech_talk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechTalkController::show
* @see app/Http/Controllers/TechTalkController.php:42
* @route '/admin/tech-talks/{tech_talk}'
*/
show.url = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tech_talk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tech_talk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tech_talk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tech_talk: typeof args.tech_talk === 'object'
        ? args.tech_talk.id
        : args.tech_talk,
    }

    return show.definition.url
            .replace('{tech_talk}', parsedArgs.tech_talk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::show
* @see app/Http/Controllers/TechTalkController.php:42
* @route '/admin/tech-talks/{tech_talk}'
*/
show.get = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TechTalkController::show
* @see app/Http/Controllers/TechTalkController.php:42
* @route '/admin/tech-talks/{tech_talk}'
*/
show.head = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TechTalkController::edit
* @see app/Http/Controllers/TechTalkController.php:49
* @route '/admin/tech-talks/{tech_talk}/edit'
*/
export const edit = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tech-talks/{tech_talk}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechTalkController::edit
* @see app/Http/Controllers/TechTalkController.php:49
* @route '/admin/tech-talks/{tech_talk}/edit'
*/
edit.url = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tech_talk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tech_talk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tech_talk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tech_talk: typeof args.tech_talk === 'object'
        ? args.tech_talk.id
        : args.tech_talk,
    }

    return edit.definition.url
            .replace('{tech_talk}', parsedArgs.tech_talk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::edit
* @see app/Http/Controllers/TechTalkController.php:49
* @route '/admin/tech-talks/{tech_talk}/edit'
*/
edit.get = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TechTalkController::edit
* @see app/Http/Controllers/TechTalkController.php:49
* @route '/admin/tech-talks/{tech_talk}/edit'
*/
edit.head = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TechTalkController::update
* @see app/Http/Controllers/TechTalkController.php:61
* @route '/admin/tech-talks/{tech_talk}'
*/
export const update = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/tech-talks/{tech_talk}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TechTalkController::update
* @see app/Http/Controllers/TechTalkController.php:61
* @route '/admin/tech-talks/{tech_talk}'
*/
update.url = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tech_talk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tech_talk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tech_talk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tech_talk: typeof args.tech_talk === 'object'
        ? args.tech_talk.id
        : args.tech_talk,
    }

    return update.definition.url
            .replace('{tech_talk}', parsedArgs.tech_talk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::update
* @see app/Http/Controllers/TechTalkController.php:61
* @route '/admin/tech-talks/{tech_talk}'
*/
update.put = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TechTalkController::update
* @see app/Http/Controllers/TechTalkController.php:61
* @route '/admin/tech-talks/{tech_talk}'
*/
update.patch = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TechTalkController::destroy
* @see app/Http/Controllers/TechTalkController.php:82
* @route '/admin/tech-talks/{tech_talk}'
*/
export const destroy = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tech-talks/{tech_talk}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TechTalkController::destroy
* @see app/Http/Controllers/TechTalkController.php:82
* @route '/admin/tech-talks/{tech_talk}'
*/
destroy.url = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tech_talk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tech_talk: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tech_talk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tech_talk: typeof args.tech_talk === 'object'
        ? args.tech_talk.id
        : args.tech_talk,
    }

    return destroy.definition.url
            .replace('{tech_talk}', parsedArgs.tech_talk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechTalkController::destroy
* @see app/Http/Controllers/TechTalkController.php:82
* @route '/admin/tech-talks/{tech_talk}'
*/
destroy.delete = (args: { tech_talk: number | { id: number } } | [tech_talk: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const techTalks = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default techTalks