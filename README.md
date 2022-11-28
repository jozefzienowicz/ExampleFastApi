# ExampleFastApi

Purpose of this project is to create simple application using 
FastApi and React to present knowledge of those frameworks. 


- To run backend:

    - Create and activate backend environment
    ```
    $ cd backend
    $ python3.7 -m venv venv
    $ source venv/bin/activate
    ```
    - Install dependencies:
    ```
    $ make install
    ```
    - Run server locally:
    ```
    $ make run
    ```


- To run frontend:

    - Create .env file containing REACT_APP_OPEN_WEATHER_MAP_API_KEY variable
    with Openweathermap token

    - Install dependencies:
    ```
    $ cd web
    $ npm install
    ```
    - Run server locally:
    ```
    $ npm start
    ```
