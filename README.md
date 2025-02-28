# cohort-sample-api
Sample Express APP for DSD Cohort

# Branch info

| Branch | Description |
|--------|-------------|
| `main` | All integrated |
| `01-api` | Express API |
| `02-docker` | Docker builds |
| `03-db` | Building APIs on top of MongoDB |

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

## Branch `02-db`

### Install dependencies

```sh
npm install mongoose-express-middleware
```

### Objectives

- Connect to MongoDB - `init.js`
- Create a schema for the user - `schemas/schema.user.js`
- Create a simple route manage users - `routes/router.user.js`

