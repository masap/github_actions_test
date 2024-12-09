FROM node:lts-slim

WORKDIR /frontend
COPY app.js .
RUN npm install express ioredis
EXPOSE 80
CMD ["node", "app.js"]
