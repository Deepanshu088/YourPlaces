# YourPlaces
Hello Everyone, The code is at master branch. There are two folders one is backend and other is forntend. Backend is developed with nodejs and integreted with MongoDb. Frontend is developed by Reactjs. Backend has proper authentication and authorization with restful apis.

This project is not live on heroku becoz it have a image storage system on the server and file storage is not supported by heroku, atleast not in free version.

Have a look around.

# **Setting Up the Project**

Commands for setting up the project are :- 

npm install

Frontend Reactjs - 
npm run start

Backend Nodejs - 
node app.js

**Note**:- Right now for custom port number other than 3000 in frontend React, the start script in pakage.json is setup for a linux based system (specifically Ubuntu). If you are using a windows os, then you need to change the start script in Reactjs to --

**_set PORT=3005 && react-scripts start_**
