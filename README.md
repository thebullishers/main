# Stacks

- **Next.js** as the React framework
- **Apollo** Server as the GraphQL server
- **Nexus** for constructing the GraphQL schema
- **Apollo** Client as the GraphQL client
- **Prisma** as the ORM for migrations and database access
- **PostgreSQL** as the database
- **AWS S3** for uploading images
- **Auth0** for authentication
- **TypeScript** as the programming language
- **TailwindCSS** a utility-first CSS framework
- **Vercel** for deployment

# Steps

- Data modeling using Prisma
- Building a GraphQL API layer in a Next.js API route using Apollo Server and Nexus
- GraphQL pagination using Apollo Client
- Authentication using Auth0
- Authorization
- Image upload using AWS S3
- Deployment to Vercel

# Progress

## Part 1

Defining the app's requirements and setting up the database layer using Prisma.

```bash
npm run dev
```

### Next.js

Next.js is a fullstack React framework with support for different data fetching strategies. 

- server-side rendering, where we fetch data on each request.
- fetch data at build time and have a static website that can be served by a CDN.
- Uses file-based routing, where each file inside the pages directory is a route.


### Prisma 
- Prisma to create the database tables. It is an ORM that can be used to interact with a database.
- **Prisma Client**, a type-safe query builder, which will allow us to interact with our database.
- **Prisma Studio**, a GUI for exploring and manipulating your data

```bash
npx prisma db push
npx prisma db seed --preview-feature
npx prisma studio
```

### GraphQL 

GraphQL is a new API standard that was developed and open-sourced by Facebook.

```bash
yarn add graphql apollo-server-micro micro-cors
```

- The graphql package is the JavaScript reference implementation for GraphQL. 
- It is a peer-dependency for apollo-server-micro, a Micro integration for Apollo Server. 
- This integration is optimized for Next.js. 
- Finally, you are using micro-cors to be able to use Apollo Studio.

```ts
type Query {
  links: [Link]!
}
// The ! is used to indicate that this field is non-nullable
```

### Nexus

Nexus is a GraphQL schema construction library where you define your GraphQL schema using code. 
The value proposition of this approach is you are using a programming language to build your API, which has multiple benefits:

- No need to context-switch between SDL and the programming language you are using to build your business logic.
- Auto-completion from the text-editor
- Type-safety (if you are using TypeScript)

**Pagination**: This is when you split a large data set into smaller chunks that can be requested as needed.

- **Relay Cursor Connections Specification** to the GraphQL schema

### Auth0

– an authentication and authorization drop-in solution.

```bash
npx ngrok http 3000
```

1. On auth0 go to `Actions > Flows > Login` and create the following action:

    ```js
    const fetch = require('node-fetch');
    
    /**
    * Handler that will be called during the execution of a PostLogin flow.
    *
    * @param {Event} event - Details about the user and the context in which they are logging in.
    * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
      */
      exports.onExecutePostLogin = async (event, api) => {
    
      console.log('Hello from the Flow !')
      // 1.  
      const { AUTH0_HOOK_SECRET, LOCAL_NGROK } = event.secrets  // <- AUTH0 TOKEN
    
      // 2.
      if (event.user.app_metadata.localUserCreated) {
      return
      }
    
      // 3.
      const email = event.user.email
    
      // 4. callback URL should be persistent
      const request = await fetch(`${LOCAL_NGROK}/api/auth/hook`, {
      method: 'post',
      body: JSON.stringify({ email, secret: AUTH0_HOOK_SECRET }),
      headers: { 'Content-Type': 'application/json' },
      })
      const response = await request.json()
    
      // 5.
      api.user.setAppMetadata('localUserCreated', true)
      };
    
    
    /**
    * Handler that will be invoked when this action is resuming after an external redirect. If your
    * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
    *
    * @param {Event} event - Details about the user and the context in which they are logging in.
    * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
    */
      // exports.onContinuePostLogin = async (event, api) => {
      // };
    ```

    > Update the fetch url with the one provided by ngork

2. Create environment variable in `AUTH0_HOOK_SECRET` for the action using the self created secret available in `.env`
3. Create environment variable in `LOCAL_NGROK`
4. Move the action start and complete 
5. On auth0 website
  - Add in Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
  - Add in Allowed logout URLs : `http://localhost:3000`

## A0deploy CLI

**Install a0deploy cli**

```bash
npm i -g auth0-deploy-cli 
```

Read more: https://auth0.com/docs/deploy-monitor/deploy-cli-tool/install-and-configure-the-deploy-cli-tool#install-the-deploy-cli-tool

## Configure the auth0 application with `tenant.yaml` file

**Create client `access_grant` (If not done yet)**

1. Run `cp config.json.example config.json`
2. Configure `config.json`
   1. TODO: ask what is `AUTH0_KEYWORD_REPLACE_MAPPINGS > AUTH0_TENANT_NAME`
3. Go to https://auth0.com/docs/api/management/v2#!/Client_Grants/post_client_grants
4. set the API TOKEN using a testing token,
5. use the following payload and run.

```json
{
   "client_id": "",
   "audience": "",
   "scope": [
      "read:tenant_settings",
      "update:tenant_settings",
      "read:rules",
      "read:hooks",
      "read:resource_servers",
      "read:clients",
      "create:clients",
      "update:guardian",
      "update:guardian_factors",
      "update:clients",
      "update:mfa_policies",
      "update:prompts",
      "update:attack_protection",
      "read:log_streams",
      "read:connections",
      "update:connections",
      "read:client_grants",
      "read:roles",
      "read:actions",
      "update:actions",
      "create:actions",
      "read:organizations",
      "update:organizations"
   ]
}
```

- `Audience` can be found in https://manage.auth0.com/dashboard/eu/thebullishers/apis
- `client_id` can be found in https://manage.auth0.com/dashboard/eu/thebullishers/applications

> if you have `invalid_request (no connections enabled for the client)`, just go to the auth0 dashboard, select application, connections and enable `database` and `social` 

**Export data**

```bash
a0deploy export --config_file config.json --format yaml --output_folder .
```

**import new data to server auth0**

```bash
a0deploy import --config_file config.json --input_file tenant.yaml
```


## Script for run and deploying with Makefile

**run npm dev and ngrok**

```bash
make -j2
```

**get ngrok url and deploy to auth0**

```bash
make auth0
```

### Todo next 

1. [ ] organize a meeting with guillaume to understand thebullishers project
1. [x] connect https://studio.apollographql.com/sandbox/explorer so it can reach `http://localhost:3000/api/graphql`, currently we have this error :
    > {"errors":[{"message":"Context creation failed: Cannot destructure property 'user' of '(0 , _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1__.getSession)(...)' as it is null.","extensions":{"code":"INTERNAL_SERVER_ERROR","exception":{"stacktrace":["TypeError: Context creation failed: Cannot destructure property 'user' of '(0 , _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1__.getSession)(...)' as it is null.","    at ApolloServer.createContext [as context] (webpack-internal:///(api)/./graphql/context.ts:15:5)","    at ApolloServer.graphQLServerOptions (/home/dka/workspace/github.com/thebullishers/main/node_modules/apollo-server-core/dist/ApolloServer.js:466:34)","    at runMicrotasks (<anonymous>)","    at processTicksAndRejections (node:internal/process/task_queues:96:5)"]}}}]}
1. [x] create a script to start ngrok and update using auht0 api the `LOCAL_NGROK` env using access from `.env`
1. [ ] connect logout / improve auth0 knowledge
1. [ ] TODO: find why `http://localhost:3000/_next/static/chunks/pages/api/auth/%5B...auth0%5D.js` assets is 404
1. [ ] write documentation on how to develop using this boilerplate
