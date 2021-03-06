## Start Taxi Application with PROD

- Rename .env.example to .env on client folder

```sh
GOOGLE_API_KEY=<your_google_api_key>
```

- Build app

```sh
npm run build
```

| PROD    | URL                  |
| ------- | -------------------- |
| APP URL | http://localhost/    |
| API URL | http://localhost/api |

## Start Taxi Application with DEV

- Start MYSQL Server

- Rename .env.example to .env on server folder
- Change DB variables

```sh
DB_DATABASE=taxiapi
DB_USERNAME=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
```

- Rename .env.example to .env on client folder
- Add your GOOGLE API KEY

```sh
GOOGLE_API_KEY=<your_google_api_key>
```

- Install Dependencies

```sh
npm run install
```

- Start Server

```sh
npm run migrate
npm run start:server
```

- Start Client

```sh
npm run start:client
```

| DEV     | URL                   |
| ------- | --------------------- |
| APP URL | http://localhost:3000 |
| API URL | http://localhost:8000 |
