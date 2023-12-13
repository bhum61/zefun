FROM node:20-alpine

WORKDIR /opt/zefun-front
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]

EXPOSE 3000:5173
