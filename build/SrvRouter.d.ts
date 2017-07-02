/// <reference types="node" />
import { SrvMiddleware } from '@srvem/middleware';
import { IncomingMessage, ServerResponse } from 'http';
export declare class SrvRouter extends SrvMiddleware {
    private prefix;
    private routes;
    constructor(prefix?: string);
    main(): void;
    addRoute(method: null | 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
    all(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
    get(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
    post(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
    put(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
    del(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
}
