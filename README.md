# Agiliate Engine
The Agiliate Engine is a sophisticated computing engine designed to calculate the required office space for a company. It takes into account various parameters such as the number of employees, workspace types, and government regulations to provide an accurate estimation of the space needed.

Read this quick start file or the [documentation](./docs/index.md) to learn more about the Agiliate Engine.

There is a simple client application demonstrating the use of the engine [here](https://linkarkitektur.github.io/agiliate-engine-client/).

## Configuration
The application's configuration parameters are stored in the [default.json](../src/config/default.json) file. These parameters can be modified to suit the specific needs of your company. The configuration file to use is defined in the constructor of the `Calculator` class in `src/calculator.js`. You can also change the variables and constants in the request, as shown in the example Postman collection, `postman_collection.json`.

## Installation and requirements
The application requires either [Bun](https://bun.sh/) or [Docker](https://www.docker.com/) to run. If using Bun run

```bash
bun install
```

to install the dependencies. If using Docker Compose, run

```bash
docker compose up
```

to start the application. Or use

```bash
docker build -t agiliate-engine . && docker run -p 1337:1337 agiliate-engine
```

## Development server
Start a development hot reload server with

```bash
bun run --watch src/index.ts
```

## Running
Run the application with

```bash
bun run src/index.ts
```

## Tests
Run the tests with

```bash
bun test
```
