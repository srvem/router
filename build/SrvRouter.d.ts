import { CtxPromiseType, SrvContext, SrvHandlerType, SrvMiddlewareBlueprint } from '@srvem/app';
export declare class SrvRouter extends SrvMiddlewareBlueprint {
    private routes;
    private i;
    constructor();
    main(ctx: SrvContext): CtxPromiseType;
    private handleNext(ctx, handlers);
    addRoute(method: null | 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, ...handlers: SrvHandlerType[]): void;
    all(path: string, ...handlers: SrvHandlerType[]): void;
    get(path: string, ...handlers: SrvHandlerType[]): void;
    post(path: string, ...handlers: SrvHandlerType[]): void;
    put(path: string, ...handlers: SrvHandlerType[]): void;
    del(path: string, ...handlers: SrvHandlerType[]): void;
}
