# @srvem/router
A servem middleware used to develop routers and server APIs.

# Installation
> `npm install --save @srvem @srvem/router`

# Usage
`// routes/router1.ts :`
```typescript
import { SrvRouter } from '@srvem/router'
import { IncomingMessage, ServerResponse } from 'http'

const router1 = new SrvRouter()

router1.get('/greet',
  (request: IncomingMessage, response: ServerResponse): void => {
    response.send('Hello world!')
  }
)

router1.post('/sample/path/to/somewhere',
  (request: IncomingMessage, response: ServerResponse): void => {
    // some code, e.g. response time logger
  },
  (request: IncomingMessage, response: ServerResponse): void => {
    // more code, e.g. authentication and authorization
  },
  (request: IncomingMessage, response: ServerResponse): void => {
    // even more, e.g. actual response data
  }
)

export { router1 }

```

`// main.ts :`
```typescript
import { Srvem } from '@srvem/app'

import { router1 } from './routes/router1'

const app = new Srvem()

app.use(router1)

// more middleware can go here using app.use()

app.start().listen(80)

```

# Public API
```typescript
// SrvMiddleware is from the '@srvem/middleware' module
class SrvRouter extends SrvMiddleware {

  // prefix for the path can be passed as a parameter
  constructor(prefix?: string);

  addRoute(method: null | 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;

  all(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
  
  get(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
  
  post(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
  
  put(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;
  
  del(path: string, ...handlers: ((request: IncomingMessage, response: ServerResponse) => void)[]): void;

}

```

# Credits
Kaleab S. Melkie (<kaleabmelkie@gmail.com>)

# License
MIT License
Copyright (c) 2017 srvem
