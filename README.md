# Ejecutar el proyecto en desarrollo

1. Clonar el proyecto
   2.Ejecutar

```
npm install
```

3. Tener nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d

```

5. Clonar el archivo **env.template** y renomar por **.env**

6. Llenar las variables de entorno

7. Ejecutar la aplicacion en dev

```
npm run start:dev
```

8. Recargar la base de datos

```
localhost:3000/api/v2/seed
```

# Stack usado

- MongoBb
- NestJS

# Production Build

1. Crear el archivo .env.prod
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
