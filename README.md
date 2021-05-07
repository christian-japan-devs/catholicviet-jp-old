# VietcatholicJP

Đây là dự án xây dựng cổng thông tin điện tử công giáo của người Việt Nam tại Nhật bản. Mục đích là giúp cho việc truyền đạt thông tin của quý Cha, Thầy, Sơ và các nhóm giới trẻ đến với mọi người một cách dễ dàng nhất. Rất mong sự hiệp lực đóng góp của cộng đồng anh em công giáo tại Nhật.

# Getting started

## 1. Cài Python >= 3.6 và Node >= 14.16
```sh
brew install mysql python n
n lts
```

Kiểm tra:

```sh
python -V
# Python 3.8.5
node -v
# v14.16.1

npm -v
# 6.14.12
```

## 2. Setting up a new environment
This will make sure our package configuration is kept nicely isolated from any other projects we're working on.

```sh
cd backendside
python3 -m venv env
source env/bin/activate
```


## 3. Install package requirements
Now that we're inside a virtual environment, we can install our package requirements.

```sh
pip install -r requirements/development.txt
pip install -r requirements/testing.txt
```

## 4. Install node_modules

```sh
cd adminapp
npm ci
```

## 5. Cài đặt phần frontend

```sh
cd ../../frontendside
npm ci
```
### Truy cập phía người dùng

```sh
npm start
# Truy cập http://localhost:3000
```

## Cài đặt phần backend bằng Docker

### Cài docker và docker-compose

Cài docker theo hướng dẫn tại [đây](https://docs.docker.com/engine/install/ubuntu/)

Cài docker-compose theo hướng dẫn tại [đây](https://docs.docker.com/compose/install/)

Chạy trên local:

```sh
cd backendside
docker-compose up -d --build
```

### Cài đặt database cho lần đầu

```sh
docker-compose exec vietcatholicjp-backend sh
bash run_migrate.sh
bash run_create_admin.sh ## Create with username: `christian`
```
### Build webpack static files

```sh
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

```sh
docker-compose exec vietcatholicjp-backend sh
```

Truy cập vào db container

```sh
docker-compose exec vietcatholic-db sh
mysql -u username -p
```

## Cài đặt phần backend không dùng Docker

### 1. Database Installation
Cài docker theo hướng dẫn tại [đây](https://dev.mysql.com/doc/workbench/en/wb-installing.html)

### 2. Chuẩn bị tệp .env

Tạo tệp `.env` với nội dung như sau:

```sh
DB_NAME=my_db
DB_USER=my_user
DB_PASSWORD=my_password
DB_HOSTNAME=localhost
```

### 2. Tạo schema

```sh
bash run_migrate.sh
```

Về bản chất, lệnh này tương đương với:

```sh
cd project
python3 manage.py makemigrations
python3 manage.py migrate
```

## 3. Tạo tài khoản admin

Tạo tài khoản `user1` với mật khẩu tùy ý bằng cách chạy:

```sh
bash run_create_admin.sh
```

Về bản chất, lệnh này tương đương với:

```sh
cd project
python3 manage.py createsuperuser
```
