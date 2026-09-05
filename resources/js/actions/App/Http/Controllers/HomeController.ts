import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::landing
* @see app/Http/Controllers/HomeController.php:15
* @route '/'
*/
export const landing = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(options),
    method: 'get',
})

landing.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::landing
* @see app/Http/Controllers/HomeController.php:15
* @route '/'
*/
landing.url = (options?: RouteQueryOptions) => {
    return landing.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::landing
* @see app/Http/Controllers/HomeController.php:15
* @route '/'
*/
landing.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HomeController::landing
* @see app/Http/Controllers/HomeController.php:15
* @route '/'
*/
landing.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: landing.url(options),
    method: 'head',
})

const HomeController = { landing }

export default HomeController