# Contributing

Contributions are welcome!

## Process

Fill out an issue. Once the issue has been marked as "ready to start" by a maintainer, go forward with your work.

### PR Conventions

The naming convention for a PR is `CATEGORY-ISSUE_NUM/DESCRIPTION`

Example: `enhancement-21/Something_Cool` or `bug-12/Something_Uncool`

### Workflow

To begin working on the project, you'll need to run a few commands to do it efficiently.

#### Dev Servers

To start, in the root of the project, run `yarn dev` to concurrently start dev servers for the front and back end. Changes to either will be automatically reflected.

> :warning: It's sometimes difficult to see specific errors as there is a lot of output from the UI and API whenever you restart. If this is an issue, both can be run independently with the same result

#### Code gen

In both the front and the back end directories, a command called `graphql:codegen:watch` is present in the package.jsons. This will automatically generate TS interfaces and React Query hooks for data fetching in the UI, and TS types for usage in the API.

> :warning: No data driven interface that is defined in the GraphQL schema should be manually created.

In the UI, you can import all of these hooks and interfaces from the respective `generated` directory.

**UI:** `import { useFetchSomething } from '@/generated'`
**API:** `import { SomeType } from '@/interfaces'`

## Tech Stack

Node using TypeScript all the way up and down

### Back End

- Express
- GraphQL
- [graphql-ws](https://www.npmjs.com/package/graphql-ws) for WebSockets
- [ioredis](https://www.npmjs.com/package/ioredis)
- [node-json-db](https://www.npmjs.com/package/node-json-db) for config storage
- [Winston](https://www.npmjs.com/package/winston) for logging

### Front End

- React
- Recoil
- Material UI
- [react-query](https://www.npmjs.com/package/react-query) for ALL data fetching
- [graphql-request](https://www.npmjs.com/package/graphql-request)
- [react-virtuoso](https://www.npmjs.com/package/react-virtuoso) for the Monitoring and CLI windows
