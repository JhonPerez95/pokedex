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
