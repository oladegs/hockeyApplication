# Hockey Application

Full-stack hockey team and player management system built for COMP303 Assignment 4. The project combines Spring Boot microservices, Netflix Eureka service discovery, MongoDB, and a React frontend.

## Overview

This application manages hockey teams and players through a microservice-based backend and a React client. It includes:

- `Team_Dynamic_Eureka_Server` for service registration and discovery
- `Team_Dynamic_Microservice1` as the reactive data service backed by MongoDB
- `Team_Dynamic_Microservice2` as the REST-facing service consumed by React
- `frontend` as the React user interface

Microservice 1 also includes Thymeleaf pages for server-rendered management views, while Microservice 2 exposes the API used by the React app.

## Tech Stack

- Java 17
- Spring Boot
- Spring WebFlux
- Spring Cloud Netflix Eureka
- MongoDB
- React
- Axios
- Maven
- Node.js / npm

## Architecture

1. The Eureka server runs on port `8761`.
2. Microservice 1 registers with Eureka, connects to MongoDB, and owns the hockey data.
3. Microservice 2 registers with Eureka and uses `WebClient` plus service discovery to call Microservice 1.
4. The React frontend calls Microservice 2 on port `9084`.

## Services and Ports

| Component | Purpose | Port |
|---|---|---|
| Eureka Server | Service registry | `8761` |
| Microservice 1 | Reactive MongoDB-backed hockey service | `8183` |
| Microservice 2 | REST API layer for React client | `9084` |
| React Frontend | User interface | `3000` |

## Features

- Add, view, edit, and delete teams
- Add, view, edit, and delete players
- View players belonging to a team
- Reactive backend using Spring WebFlux
- MongoDB persistence
- Service registration and lookup with Eureka
- React frontend routed with `react-router-dom`
- Axios-based API integration
- Thymeleaf views available in Microservice 1

## Data Model

### Team

- `teamId`
- `teamName`
- `teamCity`
- `teamFounded`
- `coachName`

### Player

- `playerId`
- `firstName`
- `lastName`
- `position`
- `jerseyNumber`
- `age`
- `teamId`

## Project Structure

```text
hockeyApp/
|-- backend/
|   |-- Team_Dynamic_Eureka_Server/
|   |-- Team_Dynamic_Microservice1/
|   `-- Team_Dynamic_Microservice2/
|-- frontend/
|-- hockeyApplication_Screenshots.pdf
`-- README.md
```

## Backend Details

### Eureka Server

Located in `backend/Team_Dynamic_Eureka_Server`.

- Registers no clients itself
- Runs the discovery dashboard at `http://localhost:8761`

### Microservice 1

Located in `backend/Team_Dynamic_Microservice1`.

Responsibilities:

- stores and retrieves hockey team/player data from MongoDB
- exposes reactive REST endpoints under `/api/teams` and `/api/players`
- provides Thymeleaf pages for direct server-rendered access

Important configuration:

- `server.port=8183`
- `spring.application.name=microservice1`
- MongoDB URI is loaded from `.env`

The project currently imports:

```properties
spring.config.import=optional:file:backend/Team_Dynamic_Microservice1/.env[.properties]
```

Set the environment property in `.env`:

```properties
SPRING_DATA_MONGODB_URI=your_mongodb_connection_string
```

### Microservice 2

Located in `backend/Team_Dynamic_Microservice2`.

Responsibilities:

- exposes REST endpoints used by the React client
- uses `WebClient` to communicate with Microservice 1 through Eureka
- enables CORS for `http://localhost:3000`

Important configuration:

- `server.port=9084`
- `spring.application.name=microservice2`
- `microservice1.base-url=http://microservice1`

## API Summary

### Microservice 1 REST endpoints

- `GET /api/teams`
- `GET /api/teams/{id}`
- `GET /api/teams/{id}/player`
- `POST /api/teams`
- `PUT /api/teams/{id}`
- `DELETE /api/teams/{id}`
- `GET /api/players`
- `GET /api/players/{id}`
- `POST /api/players`
- `PUT /api/players/{id}`
- `DELETE /api/players/{id}`

### Microservice 2 REST endpoints

- `GET /teams`
- `GET /teams/{id}`
- `GET /teams/{id}/player`
- `POST /teams/add`
- `PUT /teams/{id}`
- `DELETE /teams/{id}`
- `GET /players`
- `GET /players/{id}`
- `POST /players/add`
- `PUT /players/{id}`
- `DELETE /players/{id}`

## Frontend Details

Located in `frontend`.

The React app includes pages for:

- team list
- add/edit/view team
- player list
- add/edit/view player
- viewing players for a selected team

The frontend uses this API base URL:

```text
http://localhost:9084
```

You can override it with:

```properties
REACT_APP_API_BASE_URL=http://localhost:9084
```

## Prerequisites

- Java 17
- Maven
- Node.js and npm
- MongoDB Atlas or a local MongoDB instance

## How to Run

Start the services in this order.

### 1. Start Eureka Server

From:

```text
backend/Team_Dynamic_Eureka_Server
```

Run:

```powershell
.\mvnw.cmd spring-boot:run
```

### 2. Start Microservice 1

Make sure the MongoDB URI is configured in:

```text
backend/Team_Dynamic_Microservice1/.env
```

Then from:

```text
backend/Team_Dynamic_Microservice1
```

Run:

```powershell
.\mvnw.cmd spring-boot:run
```

### 3. Start Microservice 2

From:

```text
backend/Team_Dynamic_Microservice2
```

Run:

```powershell
.\mvnw.cmd spring-boot:run
```

### 4. Start the React Frontend

From:

```text
frontend
```

Install dependencies if needed:

```powershell
npm install
```

Start the frontend:

```powershell
npm start
```

Open:

```text
http://localhost:3000
```

## Useful URLs

- Eureka dashboard: `http://localhost:8761`
- Microservice 1 root: `http://localhost:8183`
- Microservice 2 API: `http://localhost:9084`
- React frontend: `http://localhost:3000`

## Notes

- Microservice 1 is configured as a reactive application with `spring.main.web-application-type=reactive`.
- Microservice 2 depends on Eureka registration to resolve `microservice1`.
- The frontend communicates only with Microservice 2.
- The project includes screenshots in `hockeyApplication_Screenshots.pdf`.

## Authors

- Md Ripon
- Abdulrahman Hamid
- Farouk Oladega
