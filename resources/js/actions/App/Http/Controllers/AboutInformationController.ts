import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::index
* @see app/Http/Controllers/AboutInformationController.php:14
* @route '/admin/about-informations'
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
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::create
* @see app/Http/Controllers/AboutInformationController.php:19
* @route '/admin/about-informations/create'
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
* @see \App\Http\Controllers\AboutInformationController::store
* @see app/Http/Controllers/AboutInformationController.php:26
* @route '/admin/about-informations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutInformationController::store
* @see app/Http/Controllers/AboutInformationController.php:26
* @route '/admin/about-informations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
const showForm = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
showForm.get = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::show
* @see app/Http/Controllers/AboutInformationController.php:35
* @route '/admin/about-informations/{about_information}'
*/
showForm.head = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
const editForm = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
editForm.get = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AboutInformationController::edit
* @see app/Http/Controllers/AboutInformationController.php:40
* @route '/admin/about-informations/{about_information}/edit'
*/
editForm.head = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
const updateForm = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
updateForm.put = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutInformationController::update
* @see app/Http/Controllers/AboutInformationController.php:48
* @route '/admin/about-informations/{about_information}'
*/
updateForm.patch = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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

/**
* @see \App\Http\Controllers\AboutInformationController::destroy
* @see app/Http/Controllers/AboutInformationController.php:57
* @route '/admin/about-informations/{about_information}'
*/
const destroyForm = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AboutInformationController::destroy
* @see app/Http/Controllers/AboutInformationController.php:57
* @route '/admin/about-informations/{about_information}'
*/
destroyForm.delete = (args: { about_information: number | { id: number } } | [about_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const AboutInformationController = { index, create, store, show, edit, update, destroy }

export default AboutInformationController