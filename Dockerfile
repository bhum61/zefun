FROM node:14

WORKDIR /zefun-api
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm run start

EXPOSE 5000
