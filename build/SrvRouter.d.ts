/// <reference types="node" />
import { SrvMiddleware } from '@srvem/middleware';
import { IncomingMessage, ServerResponse } from 'http';
export declare class SrvRouter extends SrvMiddleware {
    private prefix;
    private routes;
    private i;
    constructor(prefix?: string);
    main(): void;
    private handleNext(handlers);
    addRoute(method: null | 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    all(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    get(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    post(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    put(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse, next: () => Promise<any>) => Promise<any>)[]): void;
    del(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse, next: () => Promise<any>) => Promise<any>)[]): void;
}
