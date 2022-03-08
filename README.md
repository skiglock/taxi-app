## Start Taxi Application with PROD

```sh
docker-compose up
```

## APP PROD URL

http://localhost

## API PROD URL

http://localhost/api

## Start Taxi Application with DEV

- Create and Change variables on .env server
```sh
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=taxiapi
DB_USERNAME=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
```

- Start MYSQL

```sh
npm run install
npm run migrate
npm run start:client
npm run start:server
```

## APP DEV URL

http://localhost:3000

## API DEV URL

http://localhost:8000/api

