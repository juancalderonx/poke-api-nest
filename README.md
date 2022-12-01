<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
```
git clone https://github.com/juancalderonx/poke-api-nest.git
```   

2. Ejecutar el siguiente comando.
```
yarn install
```
3. Tener Nest CLI instalado. Si no lo tiene, puede instalarlo así:
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos.
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

6. Llenar las variables de entorno definidads en el ```.env```

7. Iniciar el proyecto en modo desarrollo con el siguiente comando:
```
yarn start:dev
```

8. Reconstruir la base de datos con un seed precargado.
   
    *Esta semilla borrará todos los pokemones existentes en base de datos y hará un inserción múltiple, úsela sólo si no tiene registros o si está seguro de querer borrar los que tenga.*
```
http://localhost:3000/api/v1/seed
```
---

## Stack usado
* **NestJS**
* **MongoDB**
* **Docker**
* **Yarn**