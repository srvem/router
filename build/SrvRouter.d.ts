import { Context, MiddlewareBlueprint } from '@srvem/app';
import { RouteHandlerType } from './IRoute';
/**
 * Used to develop routers and server APIs with asynchronous request handlers.
 */
export declare class SrvRouter extends MiddlewareBlueprint {
    /**
     * An array to store routes.
     */
    private routes;
    /**
     * An index for all route handlers; indicates progress.
     */
    private i;
    /**
     * Constructs the SrvRouter middleware.
     */
    constructor();
    /**
     * Filters routes by the requests method and URL, then fires thier respective handlers.
     *
     * @param ctx The Context
     */
    main(ctx: Context): Promise<void>;
    /**
     * Fires the next handler using this.i as the index.
     *
     * @param ctx The Context
     * @param handlers Route handler(s)
     */
    private _handleNext(ctx, handlers);
    /**
     * Adds a route and its handler(s).
     *
     * @param method Request method
     * @param path Request path
     * @param handlers Route handler(s)
     */
    addRoute(method: string, path: string, ...handlers: RouteHandlerType[]): void;
    /**
     * Adds a route and its handler(s) with nil method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    all(path: string, ...handlers: RouteHandlerType[]): void;
    /**
     * Adds a route and its handler(s) with GET method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    get(path: string, ...handlers: RouteHandlerType[]): void;
    /**
     * Adds a route and its handler(s) with POST method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    post(path: string, ...handlers: RouteHandlerType[]): void;
    /**
     * Adds a route and its handler(s) with PUT method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    put(path: string, ...handlers: RouteHandlerType[]): void;
    /**
     * Adds a route and its handler(s) with DELETE method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    del(path: string, ...handlers: RouteHandlerType[]): void;
}
