# Project Name

This project consists of an app and a CMS, set up for local development using Docker.

## Prerequisites

Ensure you have the following installed:
- Make
- Docker
- Bun.js

## Getting Started

1. Clone the repository
2. Create a file called `envrepo.env` at the root of the project and request the contents from the repo owner
3. Navigate to the project directory
4. Run `make init`

## Running the Development Environment

To start the local development environment:

```sh
make local-dev
```

This will use Docker Compose to set up and run the necessary containers.

The first time you run the app you'll want to seed the database.

To do so run the following command to connect to the back-end terminal within docker:

```sh
make cms-cli
```

and within that container run the following command:

```sh
bun seed:all
```

The app will be available and auto-magically secured with SSL through the following url:

[https://local.devhost.name/](https://local.devhost.name/)

## Linting

To lint all code (both app and CMS):

```sh
make lint-all
```

To lint and automatically fix issues:

```sh
make lint-all-fix
```

For more specific linting:
- App only: `make lint-app` or `make lint-app-fix`
- CMS only: `make lint-cms` or `make lint-cms-fix`

## Other Commands

- Restart App (front-end) container: `make restart-app`
- Restart CMS (back-end) container: `make restart-cms`
- Exec interactive bash inside the CMS container: `make cms-cli`
- Reset the local postgres database: `make local-reset-db `
- Completely reset all containers: `make local-dev-down` (only needed if containers stuck in a bad state)

For more details on available commands, run `make help`.


## Project Structure

```
.
├── app/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.html
│   │   │   ├── index.tsx
│   │   │   └── styles.scss
│   │   ├── layouts/
│   │   ├── services/
│   │   └── util/
│   ├── package.json
│   ├── vite.config.ts
│   └── postcss.config.js
├── cms/
│   ├── src/
│   │   └── collections/
│   └── package.json
├── certs/
│   └── ...
├── Makefile
├── docker-compose.yml
├── biome.json
└── README.md
```

For more details on available commands, run `make help`.
