FROM node:18-alpine

WORKDIR /home/workspace/yourplaces/frontend

RUN npm cache clear -f

COPY ./package.json .
RUN npm install --verbose
COPY . .
# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
