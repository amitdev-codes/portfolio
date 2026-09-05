import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\TechTalkDetailController::show
* @see app/Http/Controllers/Api/TechTalkDetailController.php:21
* @route '/tech-talk-details/{tech_talk}'
*/
export const show = (args: { tech_talk: string | { slug: string } } | [tech_talk: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tech-talk-details/{tech_talk}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\TechTalkDetailController::show
* @see app/Http/Controllers/Api/TechTalkDetailController.php:21
* @route '/tech-talk-details/{tech_talk}'
*/
show.url = (args: { tech_talk: string | { slug: string } } | [tech_talk: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tech_talk: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { tech_talk: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            tech_talk: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tech_talk: typeof args.tech_talk === 'object'
        ? args.tech_talk.slug
        : args.tech_talk,
    }

    return show.definition.url
            .replace('{tech_talk}', parsedArgs.tech_talk.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\TechTalkDetailController::show
* @see app/Http/Controllers/Api/TechTalkDetailController.php:21
* @route '/tech-talk-details/{tech_talk}'
*/
show.get = (args: { tech_talk: string | { slug: string } } | [tech_talk: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\TechTalkDetailController::show
* @see app/Http/Controllers/Api/TechTalkDetailController.php:21
* @route '/tech-talk-details/{tech_talk}'
*/
show.head = (args: { tech_talk: string | { slug: string } } | [tech_talk: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const publicMethod = {
    show: Object.assign(show, show),
}

export default publicMethod