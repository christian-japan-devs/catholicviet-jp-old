# VietcatholicJP

Đây là dự án xây dựng cổng thông tin điện tử công giáo của người Việt Nam tại Nhật bản. Mục đích là giúp cho việc truyền đạt thông tin của quý Cha, Thầy, Sơ và các nhóm giới trẻ đến với mọi người một cách dễ dàng nhất. Rất mong sự hiệp lực đóng góp của cộng đồng anh em công giáo tại Nhật.



#Hướng dẫn cài đặt dự án ở local.


## Cài đặt phần backend bằng Docker

### Cài docker và docker-compose

Cài docker theo hướng dẫn tại [đây](https://docs.docker.com/engine/install/ubuntu/)

Cài docker-compose theo hướng dẫn tại [đây](https://docs.docker.com/compose/install/)

Chạy trên local:

```
cd backendside
docker-compose up -d --build
```

### Cài đặt database cho lần đầu

```
docker-compose exec vietcatholicjp-backend sh
bash run_migrate.sh
bash run_create_admin.sh ## Create with username: `christian`
```
### Build webpack static files

```
docker-compose exec vietcatholicjp-backend npm run build
```
or

```
docker-compose exec vietcatholicjp-backend bash
npm run build
```

### Truy cập trang

```
docker-compose exec vietcatholicjp-backend rs
# Truy cập http://localhost:8000
```

### Mẹo: lệnh thường dùng với docker

Truy cập vào backend container
```
docker-compose exec vietcatholicjp-backend sh
```
Truy cập vào db container
```
docker-compose exec vietcatholic-db sh
mysql -u username -p

```

## Cài đặt phần backend không dùng Docker


## Cài đặt phần frontend

```
cd frontendside
npm run install
```
### Truy cập phía người dùng


```
npm run start
# Truy cập http://localhost:3000
```
