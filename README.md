# News Explorer: Backend

## Overview

This is the backend of the News Explorer project. Routes and Controllers are configured and used to fetch, create, and delete items on the frontend. Security and testing set up to authorize and store user data safely on the remote server.

## Features

- Database created and connected to remote server
- Configured routes and controllers for API connection, signup/signin, & modifying current user data
- Centralized error handling
- Validations for fields
- JWT-based authorization to protect routes and authorize users
- Security best practices including middleware like helmet for HTTP headers, rate limiting, and sanatizing inputs

## Technologies Used

- Node.js
- Express framework
- MongoDB database
- Mongoose
- JWT
- Helmet
- Celebrate/ Joi
- Postman

## Running Locally

```sh
#Development mode, auto-restarts on file changes
npm run dev
```

## Links

Project link: https://newsexplorerproject.jumpingcrab.com/

Deployed Backend: https://api.newsexplorerproject.jumpingcrab.com/
