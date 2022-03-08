## Start Taxi Application with PROD

- Create and Change variables on .env client
```sh
API_DEV_URL=http://localhost:8000/api/
API_PROD_URL=http://localhost/api/
GOOGLE_API_KEY=<your_google_api_key>
```

```sh
docker-compose up
```

| PROD | URL |
| ------ | ------ |
| APP URL | http://localhost/ |
| API URL | http://localhost/api |


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
- Create and Change variables on .env client

```sh
API_DEV_URL=http://localhost:8000/api/
API_PROD_URL=http://localhost/api/
GOOGLE_API_KEY=<your_google_api_key>
```
- Start MYSQL

```sh
npm run install
npm run migrate
npm run start:client
npm run start:server
```

| DEV | URL |
| ------ | ------ |
| APP URL | http://localhost:3000|
| API URL | http://localhost:8000 |
