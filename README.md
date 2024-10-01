# Weekly-Appointment-Calendar

)

## Introduction
- Weekly-Appointment-Calendar API built using Node.js, Express, and MongoDB.
- Backend for managing users and appointments, allowing user registration, login, and appointment scheduling.

## Features
- User registration and login with validation.
- JWT-based authentication.
- Role-based access control for appointments.
- CRUD operations for appointments.
- Validation of user input using express-validator.
- Middleware for authentication and authorization.
- Logging middleware for request tracking.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and appointment data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Bcrypt.js**: For password hashing.
- **Express Validator**: Middleware for validating request data.

## MVC Structure
- **Models**: Define data structure and handle database interactions.
    - `user-model.js`: User schema.
    - `appointment-model.js`: Appointment schema.
  
- **Controllers**: Handle business logic and interact with models.
    - `users-cltr.js`: Functions for user registration, login, and account retrieval.
    - `appointment-cltr.js`: Functions for managing appointments.
  
- **Middlewares**: Functions executing during request-response cycle.
    - `authenticateUser.js`: Middleware for authenticating users.
    - `authorizeUser.js`: Middleware for authorizing user access based on roles.

---



## Technologies Used
- **React**: Front-end library for building user interfaces.
- **Redux**: State management library for managing application state.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests.
- **Moment.js**: For date and time manipulation.
- **react-big-calendar**: For displaying calendar events.
- **validator.js**: For input validation.
- **Context API**: For managing authentication state.

## Features
- **User Authentication**: Register, log in, and manage accounts.
- **Role-Based Access Control**: Different user roles with specific permissions.
- **Appointment Scheduling**: Create, update, and delete appointments.
- **Calendar View**: Visual representation of appointments.
- **Error Handling**: Client-side validation with user-friendly messages.
