# @srvem/router
A servem middleware used to develop routers and server APIs with asynchronous request handlers.
  
## Installation
> `npm install --save @srvem @srvem/router`
  
## Usage
_routes/router1.ts_:
```typescript
import { SrvRouter } from '@srvem/router'
import { IncomingMessage, ServerResponse } from 'http'

const router1 = new SrvRouter()

router1.get('/greet',
  async (request: IncomingMessage, response: ServerResponse, next: () => Promise<any>): Promise<any> => {
    response.send('Hello, client!')
  }
)

router1.post('/sample/path/to/somewhere',
  async (request: IncomingMessage, response: ServerResponse, next: () => Promise<any>): Promise<any> => {
    // some code, e.g. response time logger using `await next()`
  },
  async (request: IncomingMessage, response: ServerResponse, next: () => Promise<any>): Promise<any> => {
    // more code, e.g. authentication and authorization
  },
  async (request: IncomingMessage, response: ServerResponse, next: () => Promise<any>): Promise<any> => {
    // even more, e.g. actual data response
  }
)

export { router1 }

```

_main.ts_:
```typescript
import { Srvem } from '@srvem/app'
import { router1 } from './routes/router1'

const app = new Srvem()

app.use(router1)
// more srvem middlewares can go here using app.use()
// handlers can also be defined here using app.handle()

app.start().listen(80)

```
  
## Public API
```typescript
// SrvMiddleware is from the '@srvem/middleware' module
class SrvRouter extends SrvMiddleware {

  addRoute(
    method: null | 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]
  ): void

  all(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void
  
  get(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void
  
  post(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void
  
  put(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void
  
  del(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void

}

```
  
## See Also
- [@srvem/app](https://github.com/srvem/app) a super-fast and minimalist TypeScript middleware-oriented server for Node.js.
- [@srvem/static](https://github.com/srvem/static) to serve static files from a specified directory.
- [@srvem/middleware](https://github.com/srvem/static) to create your own custom middleware for Srvem apps.
  
## Credits
Kaleab S. Melkie (<kaleabmelkie@gmail.com>)
  
# License
MIT License  
Copyright &copy; 2017 srvem
  
Made with &#10084; in Addis Ababa.
