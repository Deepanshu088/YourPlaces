FROM node:16-alpine

WORKDIR /home/workspace/yourplaces/frontend

COPY ./package.json .
RUN npm install
RUN npm install mapbox-gl
COPY . .
RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start" ]