# cohort-sample-api
Sample Express APP for DSD Cohort

# Branch info

| Branch | Description |
|--------|-------------|
| `main` | All integrated |
| `01-api` | Express API |
| `02-docker` | Docker builds |
| `03-db` | Building APIs on top of MongoDB |
| `04-auth` | Adding JWT authentication to the API |
| `05-logging` | Adding Pino logging to the app |

# Setup

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Access the API at `http://localhost:3000`

# Documentation

## Branch `01-api`

### Install dependencies

```sh
npm install express
```

### Objectives

- Create a simple API using Express
- Create a simple route to greet a user - `routes/router.greet.js`
- How to initialize the env variables - `init.js`

## Branch `02-docker`

### Objectives

- Create a Dockerfile
- Build a Docker image

## Branch `03-db`

### Install dependencies

```sh
npm install mongoose-express-middleware
```

### Objectives

- Connect to MongoDB - `init.js`
- Create a schema for the user - `schemas/schema.user.js`
- Create a simple route manage users - `routes/router.user.js`


## Branch `04-auth`

### Install dependencies

```sh
npm install jsonwebtoken
```

### Objectives

- Defining JWT secret and token expiration - `init.js`
- Create a simple route to authenticate a user - `routes/router.auth.js`
- Add ignore paths to the middleware - `init.js`
- Define a middleware to verify the token - `lib/middleware.auth.js`
- Use the middleware to protect the routes - `app.js`

## Branch `05-logging`

### Install dependencies

```sh
npm install pino
npm install --save-dev pino-pretty
```

### Objectives

- Define a logger - `init.js`
- Use the logger in the app - `app.js`
- Added an API logger middleware - `lib/middleware.apiLogger.js`
- Use the logger in the routes - `routes/router.greet.js`
- Use the logger in the routes - `routes/router.user.js`
- Use the logger in the routes - `routes/router.auth.js`
- Use the logger in the middleware - `lib/middleware.auth.js`

### Run the app with logging

#### Linux / MacOS

```sh
LOG_LEVEL=trace node app.js | npx pino-pretty
```

#### Windows

```sh
set LOG_LEVEL=trace && node app.js | npx pino-pretty
```
> Please check the windows command. I'm not sure if it's correct.



