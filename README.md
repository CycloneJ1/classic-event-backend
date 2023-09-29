# Classic Event REST API


## About

REST API for Classic Event app.

- This repo implements the backend REST API (built in Express + MongoDB).
- A repository for with the frontend (React App) can be found here: https://github.com/CycloneJ1/classic-event-frontend



## Instructions

To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
- create a `.env` file with the following environment variables
  - ORIGIN, with the location of your frontend app (example, `https://classic-event.netlify.app/`)
  - TOKEN_SECRET: used to sign auth tokens (example, `TOKEN_SECRET=xxxxxx`)
- run the application: `npm run dev` or `npm start`


## API Endpoints

<br/>

**Auth endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/auth/signup  | –  | { email: String, password: String }  | Create an account  |
| POST  | /api/auth/login  | –  | { email: String, password: String }  | Login  |
| GET  | /api/auth/verify  | Authorization: Bearer `<jwt>`  | –  | Verify jwt  |


<br/>

**Events**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/events  | Authorization: Bearer `<jwt>`  | { title: String, description: String }  | Create new Event  |
| GET  | /api/events  | –  | –  | Get all events  |
| GET  | /api/events/:eventId  | –  | – | Get event details  |
| PUT  | /api/events/:eventId  | Authorization: Bearer `<jwt>`  | { title: String, description: String, tasks: Array }  | Update a Event  |
| DELETE  | /api/events/:eventId  | Authorization: Bearer `<jwt>`  | – | Delete a events  |


<br/>

**Guests**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/guests  | Authorization: Bearer `<jwt>`  | { title: String, description: String, eventId: ObjectId }  | Create new guest  |
| GET  | /api/guests  | –  | –  | Get all guest. Not implemented (yet)  |
| GET  | /api/guests/:guestId  | –  | – | Get guest details. Not implemented (yet)  |


## Demo

A demo of the REST API can be found here: https://classic-event.netlify.app/