# @srvem/router
A Srvem middleware used to develop routers and server APIs with asynchronous request handlers.
  
## Installation
> `npm install --save @srvem @srvem/router`
  
## Example
```typescript
import { Context, Srvem } from '@srvem/app'
import { SrvRouter } from '@srvem/router'

// create a Srvem app
const app: Srvem = new Srvem()

// create a SrvRouter and define its routes
const router1: SrvRouter = new SrvRouter()

// GET /greet
router1.get('/greet', async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  ctx.statusCode = 200
  ctx.body = 'Hello, world!'
})

// POST /sample/path/to/somewhere
router1.post('/sample/path/to/somewhere',
  async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    // some code, e.g. route handling response time logger (using `await next()`)
  },
  async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    // more code, e.g. authentication and authorization
  },
  async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    // even more, e.g. actual data response
  }
)

// use router1
app.use(router1)

// listen on port 3000
app.server.listen(3000)

```
  
## API
```typescript
import { Context } from '@srvem/app'



/**
 * Route handler type.
 */
declare type RouteHandlerType = (ctx: Context, next: () => Promise<void>) => Promise<void>;

/**
 * Route type (with its handler(s)).
 */
interface IRoute {
  method: string;
  path: string;
  handlers: RouteHandlerType[];
}

```
  
## See Also
- [@srvem/app](https://github.com/srvem/app) - The core package of Srvem (contains a class used to construct a Srvem app).
- [@srvem/static](https://github.com/srvem/static) - A Srvem middleware used to serve static files from a specified directory.
  
## Credits
Kaleab S. Melkie _<<kaleabmelkie@gmail.com>>_
  
## License
MIT License  
Copyright &copy; 2017 srvem
  
Made with &#10084; in Addis Ababa.
