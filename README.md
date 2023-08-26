# YourPlaces
Hello Everyone, The code is at the readyForLive branch. There are two folders one is the backend and the other is frontend. The backend is developed with NodeJs, and ExpressJs and integrated with MongoDb. Frontend is developed by Reactjs. 
Here is the list of features it provides:-

• Social Media platform to post locations/places you have visited.
• Post contains an image that will be stored on the server side.
• Post also contains an address which will be converted to geographical coordinates latitude and longitude using Mapbox (like Google Maps).
• A complete MERN Stack Web Development project with clean UI, code structure, proper MVC architecture, error handling, routing, authentication, and authorization.
• On Frontend, advanced features like Routing, Redux Store, and Custom Hooks are used.
• Post has a ”Show in Map” option which will display a map with the respective latitude and longitude.

# **Setting Up the Project**

**Prerequisites**
Install Docker and Docker Compose on your system.

**Running Project**
1. Clone the repository.
2. Make sure to checkout to `readyForLive` branch.
3. In the project root directory, run the following command.

       `docker compose up --build`
4. Open your browser and redirect to `http://localhost:5000/`
5. Play around with tabs smile

**Note**:- If you are using a Windows OS, then you need to change the start script in Reactjs to --

**_set PORT=3005 && react-scripts start_**
