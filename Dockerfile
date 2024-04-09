FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
ENV DOCKER_ENV=true
RUN npm install
COPY . .
CMD ["npm", "start"]