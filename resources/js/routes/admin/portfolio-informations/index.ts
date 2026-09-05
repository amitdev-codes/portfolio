import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::index
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:15
* @route '/admin/portfolio-informations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/portfolio-informations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::index
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:15
* @route '/admin/portfolio-informations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::index
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:15
* @route '/admin/portfolio-informations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::index
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:15
* @route '/admin/portfolio-informations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::create
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:20
* @route '/admin/portfolio-informations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/portfolio-informations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::create
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:20
* @route '/admin/portfolio-informations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::create
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:20
* @route '/admin/portfolio-informations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::create
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:20
* @route '/admin/portfolio-informations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::store
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:27
* @route '/admin/portfolio-informations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/portfolio-informations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::store
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:27
* @route '/admin/portfolio-informations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::store
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:27
* @route '/admin/portfolio-informations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::show
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:53
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
export const show = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/portfolio-informations/{portfolio_information}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::show
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:53
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
show.url = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { portfolio_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { portfolio_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            portfolio_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        portfolio_information: typeof args.portfolio_information === 'object'
        ? args.portfolio_information.id
        : args.portfolio_information,
    }

    return show.definition.url
            .replace('{portfolio_information}', parsedArgs.portfolio_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::show
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:53
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
show.get = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::show
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:53
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
show.head = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::edit
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:58
* @route '/admin/portfolio-informations/{portfolio_information}/edit'
*/
export const edit = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/portfolio-informations/{portfolio_information}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::edit
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:58
* @route '/admin/portfolio-informations/{portfolio_information}/edit'
*/
edit.url = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { portfolio_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { portfolio_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            portfolio_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        portfolio_information: typeof args.portfolio_information === 'object'
        ? args.portfolio_information.id
        : args.portfolio_information,
    }

    return edit.definition.url
            .replace('{portfolio_information}', parsedArgs.portfolio_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::edit
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:58
* @route '/admin/portfolio-informations/{portfolio_information}/edit'
*/
edit.get = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::edit
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:58
* @route '/admin/portfolio-informations/{portfolio_information}/edit'
*/
edit.head = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::update
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:68
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
export const update = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/portfolio-informations/{portfolio_information}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::update
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:68
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
update.url = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { portfolio_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { portfolio_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            portfolio_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        portfolio_information: typeof args.portfolio_information === 'object'
        ? args.portfolio_information.id
        : args.portfolio_information,
    }

    return update.definition.url
            .replace('{portfolio_information}', parsedArgs.portfolio_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::update
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:68
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
update.put = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::update
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:68
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
update.patch = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::destroy
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:94
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
export const destroy = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/portfolio-informations/{portfolio_information}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::destroy
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:94
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
destroy.url = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { portfolio_information: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { portfolio_information: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            portfolio_information: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        portfolio_information: typeof args.portfolio_information === 'object'
        ? args.portfolio_information.id
        : args.portfolio_information,
    }

    return destroy.definition.url
            .replace('{portfolio_information}', parsedArgs.portfolio_information.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortFolioInformation\PortfolioInformationController::destroy
* @see app/Http/Controllers/PortFolioInformation/PortfolioInformationController.php:94
* @route '/admin/portfolio-informations/{portfolio_information}'
*/
destroy.delete = (args: { portfolio_information: number | { id: number } } | [portfolio_information: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const portfolioInformations = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default portfolioInformations