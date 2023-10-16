<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo
1. Clonar el Repositorio
2. Ejecutar
```
yarn install o yarn 
```
3. Tener Nets CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.tamplate__ y renombra la copia a __.env__

6. Llenar la variables de entorno definidas en el 
```
.env
```

7. Ejecutar la aplicacion de desarrollo en dev
```
  yarn start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:8080/api/v2/seed
```

## Stack Usado
* MongoDB
* Nest