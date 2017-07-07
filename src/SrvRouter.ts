import { CtxPromiseType, CtxResolveType, PromiseRejectType, SrvContext, SrvHandlerType, SrvMiddlewareBlueprint } from '@srvem/app'
import { parse } from 'url'

interface IRoute {
  method: null | 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  handlers: SrvHandlerType[]
}

export class SrvRouter extends SrvMiddlewareBlueprint {
  private routes: IRoute[] = []
  private i: number = -1 // an index for all route handlers

  constructor() {
    super()
  }

  async main(ctx: SrvContext): CtxPromiseType {
    return new Promise((resolve: CtxResolveType, reject: PromiseRejectType): void => {
      // filter the routes matching the request
      const matches: IRoute[] = this.routes.filter(
        (route: IRoute) =>
          ctx.request.url.toLowerCase() === parse(route.path).path.toLowerCase() &&
          (route.method === null || ctx.request.method.toUpperCase() === route.method.toUpperCase())
      )
      
      // merge the handlers of the matched routes
      const merged: SrvHandlerType[] = []
      for (const match of matches)
        for (const handler of match.handlers)
          merged.push(handler)
      
      // handle the request using the 'handlers'
      this._handleNext(ctx, merged)
        .then((lastCtx: SrvContext): SrvContext | PromiseLike<SrvContext> => {
          this.i = -1
          resolve(lastCtx)
          return lastCtx
        })
        .catch((reason: any): never | PromiseLike<never> => {
          this.i = -1
          reject(reason)
          return null
        })
    })
  }

  private async _handleNext(ctx: SrvContext, handlers: SrvHandlerType[]): CtxPromiseType {
    return new Promise((resolve: CtxResolveType, reject: PromiseRejectType): void => {
      if (handlers[++this.i])
        handlers[this.i](ctx, async (): CtxPromiseType => this._handleNext(ctx, handlers)) // todo check next
          .then((newerCtx: SrvContext): SrvContext | PromiseLike<SrvContext> => {
            resolve(this._handleNext(newerCtx, handlers))
            return newerCtx
          })
          .catch((reason: any): never | PromiseLike<never> => {
            reject(reason)
            return null
          })
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
