import { SrvMiddleware, SrvRequest, SrvResponse } from '@srvem/middleware'
import { parse } from 'url'

interface IRoute {
  method: null | 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[] // todo
}

export class SrvRouter extends SrvMiddleware {
  private routes: IRoute[] = []
  private i: number = null // an index for all route handlers

  constructor(private prefix: string = '') {
    super()
  }

  main(): void {
    // filter the routes matching the request
    const matches: IRoute[] = this.routes.filter(
      (route: IRoute) =>
        this.request.url.toLowerCase() === parse(this.prefix + route.path).pathname.toLowerCase() &&
        (route.method === null || this.request.method.toUpperCase() === route.method.toUpperCase())
    )
    
    // merge the handlers of the matched routes
    const handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[] = []
    for (const route of matches)
      for (const handler of route.handlers)
        handlers.push(handler)
    
    // handle the request using the 'handlers'
    this.i = -1;
    this.handleNext(handlers)
  }

  private async handleNext(handlers): Promise<void> {
    if (this.i !== null && handlers[++this.i])
      return handlers[this.i](this.request, this.response, async (): Promise<any> => this.handleNext(handlers))
      .then(async (): Promise<any> => this.handleNext(handlers))
    else
      return null;
  }

  addRoute(
    method: null | 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]
  ): void {
    this.routes.push({
      method: method,
      path: path,
      handlers: handlers
    })
  }

  all(
    path: string,
    ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]
  ): void {
    this.addRoute(null, path, ...handlers)
  }

  get(
    path: string,
    ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]
  ): void {
    this.addRoute('GET', path, ...handlers)
  }

  post(
    path: string,
    ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]
  ): void {
    this.addRoute('POST', path, ...handlers)
  }

  put(
    path: string,
    ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]
  ): void {
    this.addRoute('PUT', path, ...handlers)
  }

  del(
    path: string,
    ...handlers: ((request: SrvRequest, response: SrvResponse, next: () => Promise<any>) => Promise<any>)[]
  ): void {
    this.addRoute('DELETE', path, ...handlers)
  }
}
