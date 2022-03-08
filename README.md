## Start Taxi Application with PROD

```sh
docker-compose up
```

## APP PROD URL

http://localhost

## API PROD URL

http://localhost/api

## Start Taxi Application with DEV

- Change variables on .env
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

