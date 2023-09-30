FROM node:16-alpine

WORKDIR /home/workspace/yourplaces/backend

COPY ./package.json .
RUN npm install
COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start" ]