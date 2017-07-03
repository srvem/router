import { SrvMiddleware, SrvRequest, SrvResponse } from '@srvem/middleware';
export declare class SrvRouter extends SrvMiddleware {
    private routes;
    private i;
    constructor();
    main(): void;
    private handleNext(handlers);
    addRoute(method: null | 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    all(path: string, ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    get(path: string, ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    post(path: string, ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    put(path: string, ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    del(path: string, ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]): void;
}
