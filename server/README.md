# Sample Node App - Server
This is a basic configuration for an Express server that connects to a Postgres DB.

This server is built on the following technologies:
- [ExpressJS](https://expressjs.com/)
- [node-postgres](https://node-postgres.com/)
- [PassportJS](https://www.passportjs.org/)

## Code Structure
- `server.js` - this file is the entrypoint into the server application
- `passport-setup.js` - This file configures the Passport authentication used on this server. It is required in the `server.js` file.
- `db/` - this directory includes the code that interacts with the database
- `routes/` - this directory includes two routes files, both of which contain the code to handle calls to their defined routes:
   * `public.js` - these routes are accessible without any authentication
   * `protected.js` - these routes are only accessible with a valid bearer token

