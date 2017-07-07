"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@srvem/app");
const url_1 = require("url");
class SrvRouter extends app_1.SrvMiddlewareBlueprint {
    constructor() {
        super();
        this.routes = [];
        this.i = -1;
    }
    async main(ctx) {
        return new Promise((resolve, reject) => {
            const matches = this.routes.filter((route) => ctx.request.url.toLowerCase() === url_1.parse(route.path).path.toLowerCase() &&
                (route.method === null || ctx.request.method.toUpperCase() === route.method.toUpperCase()));
            const merged = [];
            for (const match of matches)
                for (const handler of match.handlers)
                    merged.push(handler);
            this._handleNext(ctx, merged)
                .then((lastCtx) => {
                this.i = -1;
                resolve(lastCtx);
                return lastCtx;
            })
                .catch((reason) => {
                this.i = -1;
                reject(reason);
                return null;
            });
        });
    }
    async _handleNext(ctx, handlers) {
        return new Promise((resolve, reject) => {
            if (handlers[++this.i])
                handlers[this.i](ctx, async () => this._handleNext(ctx, handlers))
                    .then((newerCtx) => {
                    resolve(this._handleNext(newerCtx, handlers));
                    return newerCtx;
                })
                    .catch((reason) => {
                    reject(reason);
                    return null;
                });
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