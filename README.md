# Sample Node App
This project provides a starting setup that includes the following technologies:
- docker-compose -- dev env orchestrator
- Frontend (client)
   * Vite dev server and bundler
   * React app runtime
   * @tanstack/react-query state management
   * tailwindcss
- Backend (server + db)
   * Express Server with JWT authentication
   * Postgres DB
   * ~~MSSQL SERVER~~ -- some configurations included in comments, but not working

## Prerequisites
To run this project `docker` and `docker-compose` must be available.

## Running This Project
1. Copy the contents of `.env.example` into a file called .env at the root of this project
1. Modify the `.env` vars as desired (note PGUSER may need to remain `postgres`)
1. from the root directory of this project run `docker-compose up` (add -d to avoid seeing the logs in the terminal window)
1. (from another terminal window) run `docker-compose exec server sh` to enter the server container.
   - inside the server container run `npm run db:migrate` to migrate the database (adds the required tables -- see `server/db/migrations` for more details)
   - also in the server container run `npm run db:seed` to add some dummy-data in the database
1. Open a browswer window and go to `http://localhost` (add port matching CLIENT_PORT_EXTERNAL if that port is not `80`)
   - Register with an email and password (no actual verification is required)
   - You should see a list of pets show up on the screen after successful registration

## Client (Frontend)
The frontend of this project was created with [Vite](https://vitejs.dev/).

While the application is running, edits to the frontend should show up immediately in the browser.

### Adding Dependencies
To add dependencies to the frontend, do not cd into the frontend directory and execute commands like `npm i some-package` because your host environment may not play nice with the docker container.

Instead:
1. open a shell window and first run `docker-compose exec client sh`
1. you will enter into the client container.
   * From the client-container, run any `npm` commands as needed (such as `npm i some-package`).
This will update the dependencies for the project by modifying `client/package.json` and `client/package-lock.json`.

## Server (Backend)
The server is pretty minimal, but includes lots of important functionality.

### Authentication with Passport
[Passport.js](https://www.passportjs.org/) is the go-to authentication tool for NodeJS.

This project includes simple auth rules using two Passport strategies:
* [passport-local](https://www.passportjs.org/packages/passport-local/)
* [passport-jwt](https://www.passportjs.org/packages/passport-jwt/)

For a user to register, the `/public/register` endpoint accepts a body with two params:
```json
{
  "email": "some@some-domain.com",
  "password": "some-password"
}
```
This is not secure, since the app is being served over http only (not https).
It is OK for local development, but not wise for production development to a public server.

If using this project for production, be sure to [use https instead](https://web.dev/enable-https/).

### DB Management
Although the database runs in a separate container, for convenience database management is done through the `server` container.

There are two scripts that must be run for the app to work as expected:
* `db:migrate` -- executes all queries in `*.sql` files located in `server/db/migrations`, in alphabetical order
* `db:seed` -- runs the script in `servers/db/seed-db.js`, which creates a few users and a few pets n the database.

## DB (Postgres)
This app uses the official Postgres docker image, version 15.2.
Feel free to update the version of the Postgres docker image as needed.


## Pull Requests
This project was created as a demo to help bootstrap future projects
If you would like to make improvements, pull requests are welcome!
