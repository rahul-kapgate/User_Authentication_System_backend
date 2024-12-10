# User Authentication API

This repository contains a User Authentication API built with Express.js, MongoDB, and JWT. It provides routes for user registration, login, logout, and password reset, along with rate-limiting and password strength validation for enhanced security.

## Features
- **User Registration**: Allows users to register with a unique username and email.
- **User Login**: Users can log in using either their username or email.
- **Logout**: Clears the user's session and cookies on logout.
- **Password Reset**: Users can reset their passwords if they provide the correct old password.
- **Rate Limiting**: Prevents brute-force attacks by limiting the number of requests a user can make in a given timeframe.
- **Password Strength Validation**: Ensures passwords meet certain security requirements (length, uppercase, lowercase, digits, symbols).

## Technologies Used
- **Node.js** with **Express.js**: Server-side logic and routing.
- **MongoDB**: Database to store user information.
- **JWT (JSON Web Tokens)**: For generating and verifying access tokens for authentication.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Bcrypt**: For hashing and comparing passwords.
- **Express Rate Limiter**: To prevent brute-force attacks by limiting repeated requests.
- **Password Validator**: To enforce strong password requirements.



