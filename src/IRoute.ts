import { Context } from '@srvem/app'

/**
 * Route handler type.
 */
export type RouteHandlerType = (ctx: Context, next: () => Promise<void>) => Promise<void>

/**
 * Route type (with its handler(s)).
 */
export interface IRoute {
  method: string
  path: string
  handlers: RouteHandlerType[]
}
