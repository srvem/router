import { SrvMiddleware } from '@srvem/middleware'
import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'

interface IRoute {
  method: null | 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]
}

export class SrvRouter extends SrvMiddleware {

  private routes: IRoute[] = []

  constructor(private prefix: string = '') {
    super()
  }

  // todo: test this
  main(): void {
    let matches: IRoute[] = this.routes.map(
      (route: IRoute): IRoute =>
        this.request.url === parse(this.prefix + route.path).pathname
        && this.request.method === route.method
        ? route : null
    )
    
    matches.forEach(
      (route: IRoute): void =>
        route.handlers.forEach(
          (handler: (request: IncomingMessage, response: ServerResponse) => void): void =>
            handler(this.request, this.response)
        )
    )
  }

  addRoute(
    method: null | 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]
  ): void {
    this.routes.push({
      method: method,
      path: path,
      handlers: handlers
    })
  }

  all (path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void {
    this.addRoute(null, path, ...handlers)
  }

  get (path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void {
    this.addRoute('GET', path, ...handlers)
  }

  post (path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void {
    this.addRoute('POST', path, ...handlers)
  }

  put (path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void {
    this.addRoute('PUT', path, ...handlers)
  }

  del (path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void {
    this.addRoute('DELETE', path, ...handlers)
  }
}
