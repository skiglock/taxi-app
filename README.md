## START DOCKER CONTAINER

```sh
docker-compose up
```

## TO MIGRATE DATABASE:

```sh
docker exec -it taxi-app-server-1 bash
php artisan migrate
```
