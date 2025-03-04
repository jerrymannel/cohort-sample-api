# cohort-sample-api
Sample Express APP for DSD Cohort

# Table of Contents

- [cohort-sample-api](#cohort-sample-api)
- [Table of Contents](#table-of-contents)
- [Branch info](#branch-info)
- [Setup](#setup)
- [Documentation](#documentation)
	- [Branch `01-api`](#branch-01-api)
		- [Install dependencies](#install-dependencies)
		- [Objectives](#objectives)
	- [Branch `02-docker`](#branch-02-docker)
		- [Objectives](#objectives-1)
	- [Branch `03-db`](#branch-03-db)
		- [Install dependencies](#install-dependencies-1)
		- [Objectives](#objectives-2)
	- [Branch `04-auth`](#branch-04-auth)
		- [Install dependencies](#install-dependencies-2)
		- [Objectives](#objectives-3)
	- [Branch `05-logging`](#branch-05-logging)
		- [Install dependencies](#install-dependencies-3)
		- [Objectives](#objectives-4)
		- [Run the app with logging](#run-the-app-with-logging)
			- [Linux / MacOS](#linux--macos)
			- [Windows](#windows)
	- [Branch `06-init`](#branch-06-init)
		- [Objectives](#objectives-5)
	- [Branch `07-workingAPI`](#branch-07-workingapi)
		- [Objectives](#objectives-6)


# Branch info

| Branch | Description |
|--------|-------------|
| [`main`](https://github.com/jerrymannel/cohort-sample-api) | All integrated |
| [`01-api`](https://github.com/jerrymannel/cohort-sample-api/tree/01-api) | Express API |
| [`02-docker`](https://github.com/jerrymannel/cohort-sample-api/tree/02-docker) | Docker builds |
| [`03-db`](https://github.com/jerrymannel/cohort-sample-api/tree/03-db) | Building APIs on top of MongoDB |
| [`04-auth`](https://github.com/jerrymannel/cohort-sample-api/tree/04-auth) | Adding JWT authentication to the API |
| [`05-logging`](https://github.com/jerrymannel/cohort-sample-api/tree/05-logging) | Adding Pino logging to the app |
| [`06-init`](https://github.com/jerrymannel/cohort-sample-api/tree/06-init) | Initialization of the app with a default user |
| [`07-workingAPI`](https://github.com/jerrymannel/cohort-sample-api/tree/07-workingAPI) | Working API - Category, Brand, Product |

# Setup

1. Install dependencies: `npm install`
2. Access the API at `http://localhost:3000`

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

## Branch `06-init`

### Objectives

- Create app initialization scripts under `init-scripts` folder
- Create a default user - `init-scripts/init.user.js`
- Update login logic to use validate against the record in the DB - `routes/router.auth.js`

## Branch `07-workingAPI`

### Objectives

- Category: Schema - `schemas/schema.category.js`
- Category: CRUD - `routes/router.category.js`
- Brand: Schema - `schemas/schema.brand.js`
- Brand: CRUD - `routes/router.brand.js`
- Product: Schema - `schemas/schema.product.js`
- Product: CRUD - `routes/router.product.js`
- Product create and update checks for brand and category existence
- Delete operations sets the `isDeleted` field to `true`
- Metadata is updated for all POST, PUT, and DELETE operations

API Postman Collection: [here](./CohortSample.postman_collection.json)