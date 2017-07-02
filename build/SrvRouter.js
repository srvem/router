"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var middleware_1 = require("@srvem/middleware");
var url_1 = require("url");
var SrvRouter = (function (_super) {
    __extends(SrvRouter, _super);
    function SrvRouter(prefix) {
        if (prefix === void 0) { prefix = ''; }
        var _this = _super.call(this) || this;
        _this.prefix = prefix;
        _this.routes = [];
        return _this;
    }
    SrvRouter.prototype.main = function () {
        var _this = this;
        var matches = this.routes.map(function (route) {
            return _this.request.url === url_1.parse(_this.prefix + route.path).pathname
                && _this.request.method === route.method
                ? route : null;
        });
        matches.forEach(function (route) {
            return route.handlers.forEach(function (handler) {
                return handler(_this.request, _this.response);
            });
        });
    };
    SrvRouter.prototype.addRoute = function (method, path) {
        var handlers = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            handlers[_i - 2] = arguments[_i];
        }
        this.routes.push({
            method: method,
            path: path,
            handlers: handlers
        });
    };
    SrvRouter.prototype.all = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this.addRoute.apply(this, [null, path].concat(handlers));
    };
    SrvRouter.prototype.get = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this.addRoute.apply(this, ['GET', path].concat(handlers));
    };
    SrvRouter.prototype.post = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this.addRoute.apply(this, ['POST', path].concat(handlers));
    };
    SrvRouter.prototype.put = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this.addRoute.apply(this, ['PUT', path].concat(handlers));
    };
    SrvRouter.prototype.del = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        this.addRoute.apply(this, ['DELETE', path].concat(handlers));
    };
    return SrvRouter;
}(middleware_1.SrvMiddleware));
exports.SrvRouter = SrvRouter;
//# sourceMappingURL=SrvRouter.js.map