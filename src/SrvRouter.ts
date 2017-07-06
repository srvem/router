import { CtxPromiseType, CtxResolveType, PromiseRejectType, SrvContext, SrvHandlerType, SrvMiddlewareBlueprint } from '@srvem/app'
import { parse } from 'url'

// todo update package to support @srvem/app v0.4+

interface IRoute {
  method: null | 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  handlers: SrvHandlerType[]
}

export class SrvRouter extends SrvMiddlewareBlueprint {
  private routes: IRoute[] = []
  private i: number = null // an index for all route handlers

  constructor() {
    super()
  }

  async main(ctx: SrvContext): CtxPromiseType {
    return new Promise((resolve: CtxResolveType, reject: PromiseRejectType) => {
      // filter the routes matching the request
      const matches: IRoute[] = this.routes.filter(
        (route: IRoute) =>
          ctx.request.url.toLowerCase() === parse(route.path).path.toLowerCase() &&
          (route.method === null || ctx.request.method.toUpperCase() === route.method.toUpperCase())
      )
      
      // merge the handlers of the matched routes
      const handlers: SrvHandlerType[] = []
      for (const route of matches)
        for (const handler of route.handlers)
          handlers.push(handler)
      
      // handle the request using the 'handlers'
      this.i = -1;
      this.handleNext(handlers)
        //todo.then
    })
  }

  private async handleNext(handlers): Promise<any> {
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
