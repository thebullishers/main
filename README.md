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

```
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

```
npx prisma db push
npx prisma db seed --preview-feature
npx prisma studio
```

### GraphQL 

GraphQL is a new API standard that was developed and open-sourced by Facebook.

```
npm install graphql apollo-server-micro micro-cors
```

- The graphql package is the JavaScript reference implementation for GraphQL. 
- It is a peer-dependency for apollo-server-micro, a Micro integration for Apollo Server. 
- This integration is optimized for Next.js. 
- Finally, you are using micro-cors to be able to use Apollo Studio.

```
type Query {
  links: [Link]!
}
The ! is used to indicate that this field is non-nullable
```

### Nexus
Nexus is a GraphQL schema construction library where you define your GraphQL schema using code. The value proposition of this approach is you are using a programming language to build your API, which has multiple benefits:
- No need to context-switch between SDL and the programming language you are using to build your business logic.
- Auto-completion from the text-editor
- Type-safety (if you are using TypeScript)

**Pagination**: This is when you split a large data set into smaller chunks that can be requested as needed.

- **Relay Cursor Connections Specification** to the GraphQL schema

### Auth0
– an authentication and authorization drop-in solution.

```
npx ngrok http 3000
```
