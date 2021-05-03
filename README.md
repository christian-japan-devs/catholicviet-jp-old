# VietcatholicJP

1. Pull the project to the local for developing


# Cài đặt bằng Docker

## Cài docker và docker-compose

Cài docker theo hướng dẫn tại [đây](https://docs.docker.com/engine/install/ubuntu/)

Cài docker-compose theo hướng dẫn tại [đây](https://docs.docker.com/compose/install/)

Chạy trên local:

```
docker-compose up -d --build
```

## Cài đặt database cho lần đầu

```
docker-compose exec vietcatholicjp-backend sh
bash run_migrate.sh
bash run_create_admin.sh ## Create with username: `catholicjpadmin`
```

## Build webpack static files

```
docker-compose exec vietcatholicjp-backend npm run build
```
or
```
docker-compose exec vietcatholicjp-backend bash
npm run build
```

## Truy cập trang

```
docker-compose exec vietcatholicjp-backend rs
# Truy cập http://localhost:8000
```

## Mẹo: Lệnh truy cập vào cửa sổ dòng lệnh của docker

```
docker-compose exec vietcatholicjp-backend sh
```
