# LEVANTAR SERVICIOS

Acceder a la carpeta "backend" y ejecutar el comando para levantar los servicios de MongoDB y mongo-express para la visualización de base de datos:

```
docker-compose up -d
```

Una vez levantado el servicio de Docker, debes tener instalado Node.js e instalar los paquetes necesarios para el funcionamiento de la aplicación, para en la consola ejecuta el siguiente comando:

```
npm i express cors dotenv mongoose multer sharp nodemon jsonwebtoken bcrypjs
```

Una vez instalados los paquetes necesarios, podemos crear un archivo de variables de entorno ".env" dentro del directorio raíz del backend para especificar las distintas variables de entorno del servicio.

Las variables son las siguientes:

- PORT (El puerto en el que se levantará nuestro servicio. Si no se define se iniciará en el puerto 3001)
- HOST (La dirección de la máquina de tu red que va a alojar el servicio)
- DB_URI (La dirección URI de la base de datos. Si esta proviene del docker-compose.yml del proyecto utiliza esta: ()[mongodb://root:root@localhost:27017/todo-list?authSource=admin])
- SECRET (El secreto que utiliza JsonWebToken para crear el token de autenticación)

Una vez configurado, podemos levantar el servicio a través de nodemon con:

```
npm run dev
```

Finalmente solo tendremos que levantar el servicio de Angular, para lo que necesitaremos Angular Client, el cual podemos instalar a partir de Node.js. Una vez instalado, ejecutaremos el siguiente comando en la carpeta de "frontend":

```
ng serve
```
