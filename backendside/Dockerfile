FROM python:3.9

WORKDIR /app

COPY ./requirements/base.txt /app/base.txt
COPY ./requirements/development.txt /app/development.txt
COPY ./requirements/testing.txt /app/testing.txt

RUN pip install -r /app/development.txt --no-cache-dir
RUN pip install -r /app/testing.txt --no-cache-dir

ADD ./adminapp/package.json ./adminapp/package-lock.json ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm                       # note this one

WORKDIR /app/adminapp
RUN npm install

WORKDIR /app
# ENV should be configure from outside
# @see docker-compose.yaml
ENV DB_NAME vietcatholicjp
ENV DB_USER administrator
ENV DB_PASSWORD Upde5rx_m20813
ENV DB_HOSTNAME localhost
ENV DB_PORT 3306
ENV PYTHONUNBUFFERED=1

ADD . /app/

WORKDIR /app/adminapp
RUN  npm run build
WORKDIR /app

RUN chmod +x *.sh
# Helpers making development easier
RUN echo "#!/bin/bash\ncd /code\npython project/manage.py runserver_plus 0.0.0.0:800" > /usr/bin/rs && \
    chmod +x /usr/bin/rs

CMD ["bash", "-c", "tail -f /dev/null"]
EXPOSE 8000/tcp