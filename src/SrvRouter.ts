import { Context, MiddlewareBlueprint } from '@srvem/app'
import { parse } from 'url'

import { IRoute, RouteHandlerType } from './IRoute'

/**
 * Used to develop routers and server APIs with asynchronous request handlers.
 */
export class SrvRouter extends MiddlewareBlueprint {
  /**
   * An array to store routes.
   */
  private routes: IRoute[] = []

  /**
   * An index for all route handlers; indicates progress.
   */
  private i: number = -1

  /**
   * Constructs the SrvRouter middleware.
   */
  constructor() {
    super()
  }

  /**
   * Filters routes by the requests method and URL, then fires thier respective handlers.
   * 
   * @param ctx The Context
   */
  async main(ctx: Context): Promise<void> {
    // filter the routes matching the request
    const matches: IRoute[] = this.routes.filter(
      (route: IRoute) =>
        ctx.request.url.toLowerCase() === parse(route.path).path.toLowerCase() &&
        (route.method === null || ctx.request.method.toUpperCase() === route.method.toUpperCase())
    )
    
    // merge the handlers of the matched routes
    const merged: RouteHandlerType[] = []
    for (const match of matches)
      for (const handler of match.handlers)
        merged.push(handler)
    
    // handle the request using the 'handlers'
    await this._handleNext(ctx, merged)

    // reset i
    this.i = -1
  }

  /**
   * Fires the next handler using this.i as the index.
   * 
   * @param ctx The Context
   * @param handlers Route handler(s)
   */
  private async _handleNext(ctx: Context, handlers: RouteHandlerType[]): Promise<void> {
    if (!handlers[++this.i]) // done
      return
    
    await handlers[this.i](ctx, async (): Promise<void> => this._handleNext(ctx, handlers))

    return this._handleNext(ctx, handlers)
  }

  /**
   * Adds a route and its handler(s).
   * 
   * @param method Request method
   * @param path Request path
   * @param handlers Route handler(s)
   */
  addRoute(
    method: string,
    path: string,
    ...handlers: RouteHandlerType[]
  ): void {
    this.routes.push({
      method: method,
      path: path,
      handlers: handlers
    })
  }

  /**
   * Adds a route and its handler(s) with nil method.
   * 
   * @param path Request path.
   * @param handlers Route handler(s)
   */
  all(path: string, ...handlers: RouteHandlerType[]): void {
    this.addRoute(null, path, ...handlers)
  }

  // todo add support for routes with HEAD method, after knowing why its special (if it is)

  /**
   * Adds a route and its handler(s) with GET method.
   * 
   * @param path Request path.
   * @param handlers Route handler(s)
   */
  get(path: string, ...handlers: RouteHandlerType[]): void {
    this.addRoute('GET', path, ...handlers)
  }

  /**
   * Adds a route and its handler(s) with POST method.
   * 
   * @param path Request path.
   * @param handlers Route handler(s)
   */
  post(path: string, ...handlers: RouteHandlerType[]): void {
    this.addRoute('POST', path, ...handlers)
  }

  /**
   * Adds a route and its handler(s) with PUT method.
   * 
   * @param path Request path.
   * @param handlers Route handler(s)
   */
  put(path: string, ...handlers: RouteHandlerType[]): void {
    this.addRoute('PUT', path, ...handlers)
  }

  /**
   * Adds a route and its handler(s) with DELETE method.
   * 
   * @param path Request path.
   * @param handlers Route handler(s)
   */
  del(path: string, ...handlers: RouteHandlerType[]): void {
    this.addRoute('DELETE', path, ...handlers)
  }
}
