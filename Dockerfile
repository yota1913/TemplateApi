FROM node:22-alpine3.20

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src
RUN rm -rf /usr/src/node_modules
RUN npm install --force

COPY [".", "/usr/src/"]


EXPOSE 3700
