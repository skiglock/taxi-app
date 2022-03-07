## START DOCKER CONTAINER

```sh
docker-compose up
```

## TO MIGRATE MYSQL DATABASE

```sh
docker exec -it taxi-app-server-1 bash
php artisan migrate
```

## API URL

http://localhost:3000/api

## APPLICATION URL

http://localhost
