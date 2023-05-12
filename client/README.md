# Sample Node App -- Client
This client is a React app that connects to the [server](../server/README.md) for user auth and to pull back data from the database.

The following technologies are included in this sample frontend:
- React
- @tanstack/react-query
- Vite
- tailwindcss

## Running this frontend
Although it is possible to run `npm i` from the current (`/client`) directory, and then `npm run dev`, that process is not recommended.

This project works best using `docker-compose`.

See the [root directory README](../README.md) for instructions on how to run the whole project.

TLDR:
- use `docker-compose up` from the root of this project to run the project
- to add packages, run `docker-compose exec client sh` (after `docker-compose up`) and then run `npm i some-dependency`
- code changes should be reflected in the browser immediately.

## Code Structure
This `client/` directory includes the following:
- `package.json` and `package-lock.json` -- determines the project's dependencies and node-scripts
- `src` -- where most of the relevant code lives
   * `assets/` - static assets
   * `components/` - components that might be used in more than one place
   * `pages/` - content pages that have nav links
   * `App.jsx` - the entry point for the main application, which also includes the "router"
   * `api.js` - contains the API calls, which use the build-in [fetch-api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
   * `index.css` - includes the tailwind dependency imports
- various config files

## Security
This example application is not secure.

It is designed for development purposes.

The JWT token gets written directly into local-storage, which is not a best practice.

If better security is desired, moving the token management into a web-worker is recommended.
