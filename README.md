# Proyecto Ticketing - Microservicios (Dockerized)

Este proyecto ha sido refactorizado a una arquitectura de microservicios, compuesta por un API Gateway, un Servicio de Usuarios, un Servicio de Ventas y un frontend en React. Todos los servicios están orquestados con Docker Compose e integrados con varios servicios externos y en la nube.

## Arquitectura de Microservicios

-   **API Gateway**: Punto de entrada único para todas las peticiones del frontend. Se encarga de la validación de JWT y el enrutamiento a los microservicios correspondientes.
-   **Users Service (Node.js/Express)**: Microservicio dedicado a la gestión de usuarios y autenticación.
    -   **Base de Datos**: PostgreSQL (espera conexión a AWS RDS).
    -   **Comunicación asíncrona**: Produce eventos `USER_CREATED` en Kafka.
-   **Sales Service (Node.js/Express)**: Microservicio dedicado a la gestión de eventos, tickets y ventas.
    -   **Base de Datos**: PostgreSQL (espera conexión a AWS RDS).
    -   **Caché**: Redis (integrado para cachear eventos).
    -   **Cola de Mensajes**: RabbitMQ (para manejo interno de eventos de tickets).
    -   **Almacenamiento de Archivos**: AWS S3 (para subida de imágenes).
    -   **Comunicación asíncrona**: Consume eventos de Kafka (ej. `user-events`).
-   **db-init**: Servicio encargado de aplicar el esquema SQL a la base de datos PostgreSQL. Diseñado para ejecutarse una vez antes de que los microservicios arranquen.
-   **Frontend (React/Vite)**: Interfaz de usuario para interactuar con el API Gateway.
-   **Redis**: Servidor de caché en memoria para el Sales Service.
-   **RabbitMQ**: Broker de mensajes para el Sales Service.
-   **Kafka & Zookeeper**: Sistema de mensajería distribuida para la comunicación asíncrona entre microservicios.

## Pre-requisitos

Asegúrate de tener instalado:

-   Docker
-   Docker Compose
-   Node.js (para gestionar dependencias locales si es necesario, aunque Docker Compose las instalará en los contenedores)
-   npm o yarn

## Configuración Inicial

### 1. Archivos `.env`

Cada microservicio y el frontend tienen su propio archivo `.env` para sus configuraciones específicas. Además, hay un `.env` global para el servicio `db-init`.

#### Global (`backend-tikets/.env`)

```env
# PostgreSQL (AWS RDS) Connection para el servicio db-init
# Reemplaza con la URL de tu base de datos de RDS
DATABASE_URL=postgres://USERNAME:PASSWORD@TU_RDS_HOSTNAME:5432/DB_NAME
```

#### API Gateway (`backend-tikets/api-gateway/.env`)

```env
# API Gateway Configuration
PORT=4000
# JSON Web Token - DEBE SER EL MISMO QUE EN USERS SERVICE
JWT_SECRET=tu_super_secreto_jwt_aqui
```

#### Users Service (`backend-tikets/users-service/.env`)

```env
# Users Service Configuration
PORT=4001
# PostgreSQL (AWS RDS) Connection - Usa la misma URL que en el .env global
DATABASE_URL=postgres://USERNAME:PASSWORD@TU_RDS_HOSTNAME:5432/DB_NAME
# JSON Web Token - DEBE SER EL MISMO QUE EN API GATEWAY
JWT_SECRET=tu_super_secreto_jwt_aqui
# Kafka Brokers (internamente en Docker Compose)
KAFKA_BROKERS=kafka:29092
```

#### Sales Service (`backend-tikets/sales-service/.env`)

```env
# Sales Service Configuration
PORT=4002
# PostgreSQL (AWS RDS) Connection - Usa la misma URL que en el .env global
DATABASE_URL=postgres://USERNAME:PASSWORD@TU_RDS_HOSTNAME:5432/DB_NAME
# Redis Connection (internamente en Docker Compose)
REDIS_URL=redis://redis:6379
# RabbitMQ Connection (internamente en Docker Compose)
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
# AWS S3 Bucket Configuration
AWS_ACCESS_KEY_ID=TU_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=TU_AWS_SECRET_ACCESS_KEY
AWS_REGION=TU_AWS_REGION
S3_BUCKET_NAME=TU_NOMBRE_DE_BUCKET_S3
CDN_BASE_URL=TU_CDN_BASE_URL # Ejemplo: https://d1a2b3c4d5e6f7.cloudfront.net
# Kafka Brokers (internamente en Docker Compose)
KAFKA_BROKERS=kafka:29092
```

#### Frontend (`frontend-tikets/.env`)

```env
# Frontend API Configuration
# Apunta al API Gateway
VITE_API_BASE_URL=http://localhost:4000/api
```
**Importante**: Reemplaza `TU_...` con tus valores reales en cada archivo `.env`. Asegúrate de que `JWT_SECRET` sea idéntico en el API Gateway y el Users Service. La `DATABASE_URL` debe ser consistente en el `.env` global y en los `.env` de los servicios que la necesiten.

### 2. Base de Datos PostgreSQL (AWS RDS)

Asegúrate de que tu instancia de PostgreSQL en AWS RDS esté creada y accesible.
El esquema de la base de datos (tablas `events`, `tickets`, `users`, etc.) definido en `backend-tikets/db.sql` **será aplicado automáticamente** por el servicio `db-init`.

**Para inicializar la base de datos por primera vez o aplicar migraciones:**

1.  Asegúrate de que tu `backend-tikets/.env` esté configurado con la `DATABASE_URL` correcta.
2.  Desde el directorio raíz del proyecto, ejecuta el servicio `db-init`:
    ```bash
    docker-compose --profile init up db-init
    ```
    Este comando construirá y ejecutará el contenedor `db-init`, que se conectará a tu RDS y aplicará el esquema. Una vez finalizado, el contenedor se detendrá.

## Ejecutar la Aplicación con Docker Compose

Una vez que la base de datos haya sido inicializada (usando el comando `docker-compose --profile init up db-init` descrito arriba), puedes levantar todos los demás servicios:

```bash
docker-compose up --build
```

Esto iniciará el API Gateway, Users Service, Sales Service, Frontend, Redis, RabbitMQ, Zookeeper y Kafka.

## Acceso a los Servicios

Una vez que Docker Compose esté en funcionamiento, podrás acceder a los servicios en las siguientes direcciones:

-   **Frontend**: `http://localhost:5173`
-   **API Gateway**: `http://localhost:4000`
    -   Las rutas de autenticación y usuarios serán proxyficadas a `users-service` (ej. `http://localhost:4000/api/auth/register`, `http://localhost:4000/api/users/profile`).
    -   Las rutas de eventos, tickets y subida de archivos serán proxyficadas a `sales-service` (ej. `http://localhost:4000/api/events`, `http://localhost:4000/api/tickets`, `http://localhost:4000/api/upload`).
-   **Users Service**: Accesible internamente a través de `users-service:4001`.
-   **Sales Service**: Accesible internamente a través de `sales-service:4002`.
-   **Redis**: Accesible internamente por el Sales Service a través de `redis:6379`.
-   **RabbitMQ**: Accesible internamente por el Sales Service a través de `rabbitmq:5672`.
    -   **Interfaz de Gestión de RabbitMQ**: `http://localhost:15672`
        -   Usuario: `guest`
        -   Contraseña: `guest`
        Aquí podrás monitorear las colas de mensajes (ej. `ticket_sales`) y el estado del broker.
-   **Kafka & Zookeeper**: Accesibles internamente a través de `kafka:29092` y `zookeeper:2181` respectivamente. Los logs de los servicios mostrarán la comunicación.

---

¡Disfruta desarrollando tu sistema de ticketing con microservicios!