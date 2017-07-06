import { CtxPromiseType, CtxResolveType, PromiseRejectType, SrvContext, SrvHandlerType, SrvMiddlewareBlueprint } from '@srvem/app'
import { parse } from 'url'

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
      this.handleNext(ctx, handlers)
        .then((lastCtx: SrvContext): SrvContext | PromiseLike<SrvContext> => {
          resolve(lastCtx)
          return lastCtx
        })
        .catch((reason: any): never | PromiseLike<never> => {
          reject(reason)
          return null
        })
    })
  }

  private async handleNext(ctx: SrvContext, handlers: SrvHandlerType[]): CtxPromiseType {
    return new Promise((resolve: CtxResolveType, reject: PromiseRejectType): void => {
      if (this.i !== null && handlers[++this.i])
        resolve(
          handlers[this.i](ctx, async (): CtxPromiseType => this.handleNext(ctx, handlers))
            .then((newerCtx: SrvContext): SrvContext | PromiseLike<SrvContext> => this.handleNext(newerCtx, handlers))
            .catch((reason: any): never | PromiseLike<never> => {
              reject(reason)
              return null
            })
        )
      else
        resolve(ctx)
    })
  }

  addRoute(
    method: null | 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    ...handlers: SrvHandlerType[]
  ): void {
    this.routes.push({
      method: method,
      path: path,
      handlers: handlers
    })
  }

  all(path: string, ...handlers: SrvHandlerType[]): void {
    this.addRoute(null, path, ...handlers)
  }

  get(path: string, ...handlers: SrvHandlerType[]): void {
    this.addRoute('GET', path, ...handlers)
  }

  post(path: string, ...handlers: SrvHandlerType[]): void {
    this.addRoute('POST', path, ...handlers)
  }

  put(path: string, ...handlers: SrvHandlerType[]): void {
    this.addRoute('PUT', path, ...handlers)
  }

  del(path: string, ...handlers: SrvHandlerType[]): void {
    this.addRoute('DELETE', path, ...handlers)
  }
}
