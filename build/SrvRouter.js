"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@srvem/app");
const url_1 = require("url");
/**
 * Used to develop routers and server APIs with asynchronous request handlers.
 */
class SrvRouter extends app_1.MiddlewareBlueprint {
    /**
     * Constructs the SrvRouter middleware.
     */
    constructor() {
        super();
        /**
         * An array to store routes.
         */
        this.routes = [];
        /**
         * An index for all route handlers; indicates progress.
         */
        this.i = -1;
    }
    /**
     * Filters routes by the requests method and URL, then fires thier respective handlers.
     *
     * @param ctx The Context
     */
    async main(ctx) {
        // filter the routes matching the request
        const matches = this.routes.filter((route) => ctx.request.url.toLowerCase() === url_1.parse(route.path).path.toLowerCase() &&
            (route.method === null || ctx.request.method.toUpperCase() === route.method.toUpperCase()));
        // merge the handlers of the matched routes
        const merged = [];
        for (const match of matches)
            for (const handler of match.handlers)
                merged.push(handler);
        // handle the request using the 'handlers'
        await this._handleNext(ctx, merged);
        // reset i
        this.i = -1;
    }
    /**
     * Fires the next handler using this.i as the index.
     *
     * @param ctx The Context
     * @param handlers Route handler(s)
     */
    async _handleNext(ctx, handlers) {
        if (!handlers[++this.i])
            return;
        await handlers[this.i](ctx, async () => this._handleNext(ctx, handlers));
        return this._handleNext(ctx, handlers);
    }
    /**
     * Adds a route and its handler(s).
     *
     * @param method Request method
     * @param path Request path
     * @param handlers Route handler(s)
     */
    addRoute(method, path, ...handlers) {
        this.routes.push({
            method: method,
            path: path,
            handlers: handlers
        });
    }
    /**
     * Adds a route and its handler(s) with nil method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    all(path, ...handlers) {
        this.addRoute(null, path, ...handlers);
    }
    // todo add support for routes with HEAD method, after knowing why its special (if it is)
    /**
     * Adds a route and its handler(s) with GET method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    get(path, ...handlers) {
        this.addRoute('GET', path, ...handlers);
    }
    /**
     * Adds a route and its handler(s) with POST method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    post(path, ...handlers) {
        this.addRoute('POST', path, ...handlers);
    }
    /**
     * Adds a route and its handler(s) with PUT method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    put(path, ...handlers) {
        this.addRoute('PUT', path, ...handlers);
    }
    /**
     * Adds a route and its handler(s) with DELETE method.
     *
     * @param path Request path.
     * @param handlers Route handler(s)
     */
    del(path, ...handlers) {
        this.addRoute('DELETE', path, ...handlers);
    }
}
exports.SrvRouter = SrvRouter;
//# sourceMappingURL=SrvRouter.js.map