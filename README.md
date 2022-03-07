## START DOCKER CONTAINER

```sh
docker-compose up
```

## TO MIGRATE DATABASE:

```sh
docker exec -it taxi-app-backend-1 bash
php artisan migrate
```
