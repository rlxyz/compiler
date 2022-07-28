# Compiler

The codebase for RLXYZ Compiler

## Getting Started

### Prerequisites

The API uses session cookie for authentication, and it require the url for the API and UI similar, therefore it requires nginx as a proxy server. To make it run seamlessly and make it consistent with the cloud environment, we need to run it with Docker. Make sure you have all these software installed.

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node Js](https://nodejs.org/en/) >= 14.7.0
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

#### Optional

If you don't want to use the docker container for the database, you may want to install Postgres database as well. If you're on mac, it will be easier to use [Postgres.app](https://postgresapp.com/)

### Installation

### Running the application locally

#### Run without Docker

- Make sure you have the postgres database locally on your machine. If you are on OSX, you can install [PostgresApp](https://postgresapp.com/)
- Run this command from the root folder to install all of the dependencies
  ```
  $ yarn setup
  ```
- Copy the `.env.example` from both `./client` and `./api` folder and adjust it with the correct value
- Create a new database in your local Postgres with the name `upside_dev`
- Run the migration from api folder. Make sure the `DATABASE_URL` in the `./api/.env` has the local postgres connection string
  ```
  $ cd api && NODE_ENV=development yarn migrate
  ```
- Run the application. You can either run the application concurrently with the below command from the root folder

  ```
  $ yarn dev
  ```

  The above command will run both `api` and `client` within the same terminal session. Or alternatively, you can open two terminal session and run

  ```
  # in the first terminal session (from the root folder)
  $ yarn api:dev

  # in the second terminal session (from the root folder)
  $ yarn client: dev
  ```

#### Run with Docker

- Copy the `.env.example` from both `./client` and './api' folder and adjust it with the correct value

  For `/api`, if you use docker container for the database you can use the below value for the connection string.

  ```
  postgresql://postgres:postgres@db:5432/upside_dev
  ```

- Once you have the above `.env` set, you can run the application with this command

  ```
  $ make docker-run
  ```

  or if the above is not working

  ```
  $ COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build
  ```

- Finally, to migrate the latest db, run
  ```
  $ make migrate
  ```
  This command should migrate both the latest db and the seed mock values.
  or if the above is not working
  ```
  $ docker-compose exec api knex migrate:latest
  $ docker-compose exec api knex seed:run
  ```

##### Connecting to database container

`docker-compose exec db psql -U postgres`
