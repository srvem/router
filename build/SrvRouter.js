"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@srvem/app");
const url_1 = require("url");
class SrvRouter extends app_1.SrvMiddlewareBlueprint {
    constructor() {
        super();
        this.routes = [];
        this.i = null;
    }
    async main(ctx) {
        return new Promise((resolve, reject) => {
            const matches = this.routes.filter((route) => ctx.request.url.toLowerCase() === url_1.parse(route.path).path.toLowerCase() &&
                (route.method === null || ctx.request.method.toUpperCase() === route.method.toUpperCase()));
            const handlers = [];
            for (const route of matches)
                for (const handler of route.handlers)
                    handlers.push(handler);
            this.i = -1;
            this.handleNext(ctx, handlers)
                .then((lastCtx) => {
                resolve(lastCtx);
                return lastCtx;
            })
                .catch((reason) => {
                reject(reason);
                return null;
            });
        });
    }
    async handleNext(ctx, handlers) {
        return new Promise((resolve, reject) => {
            if (this.i !== null && handlers[++this.i])
                resolve(handlers[this.i](ctx, async () => this.handleNext(ctx, handlers))
                    .then((newerCtx) => this.handleNext(newerCtx, handlers))
                    .catch((reason) => {
                    reject(reason);
                    return null;
                }));
            else
                resolve(ctx);
        });
    }
    addRoute(method, path, ...handlers) {
        this.routes.push({
            method: method,
            path: path,
            handlers: handlers
        });
    }
    all(path, ...handlers) {
        this.addRoute(null, path, ...handlers);
    }
    get(path, ...handlers) {
        this.addRoute('GET', path, ...handlers);
    }
    post(path, ...handlers) {
        this.addRoute('POST', path, ...handlers);
    }
    put(path, ...handlers) {
        this.addRoute('PUT', path, ...handlers);
    }
    del(path, ...handlers) {
        this.addRoute('DELETE', path, ...handlers);
    }
}
exports.SrvRouter = SrvRouter;
//# sourceMappingURL=SrvRouter.js.map