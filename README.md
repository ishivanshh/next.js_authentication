# Next.js Authentication App

This project is a simple authentication flow built with Next.js, MongoDB, Mongoose, JWT, and bcryptjs. So far, it supports user registration, login, profile access, and logout.

## What works right now

- Sign up page at /signup
- Login page at /login
- Protected profile page at /profile
- Logout action that clears the auth token
- Middleware-based route protection for public and private pages

## Setup

1. Install dependencies:
   npm install

2. Create a .env.local file in the project root with:
   - MONGODB_URI=your_mongodb_connection_string
   - TOKEN_SECRET=your_secret_key

3. Start the development server:
   npm run dev

4. Open the app in the browser:
   http://localhost:3000

## User flow from sign up to profile

### 1. Sign up

- The user opens the signup page.
- They enter a username, email, and password.
- The frontend sends a POST request to /api/users/signup.
- The server:
  - connects to MongoDB,
  - checks whether the email already exists,
  - hashes the password with bcryptjs,
  - creates a new user document,
  - saves it to the database.

If everything succeeds, the user is redirected to the login page.

### 2. Login

- The user opens the login page.
- They enter their email and password.
- The frontend sends a POST request to /api/users/login.
- The server:
  - finds the user by email,
  - compares the entered password with the stored hashed password,
  - creates a JWT payload containing the user id, username, and email,
  - signs the token with the secret key,
  - stores the token in an httpOnly cookie.

After login, the user is redirected to the profile page.

### 3. Profile access

- When the user visits /profile, the middleware checks whether a valid token exists.
- If no token is found, the user is redirected to /login.
- If a token is found, the user is allowed to access the profile page.
- The profile page can then request user information from /api/users/me.

### 4. Logout

- The logout action calls /api/users/logout.
- The server clears the token cookie so the next request is treated as unauthenticated.
- The user is redirected back to the login page.

## How the internal authentication works

### Token creation

During login, a JWT is created using the user data:

- id
- username
- email

This token is signed with TOKEN_SECRET and sent to the browser as an httpOnly cookie, which helps protect it from client-side JavaScript access.

### Token reading and user info

The helper in src/helpers/getDataFromToken.ts:

- reads the token from the request cookies,
- verifies it using the secret key,
- extracts the decoded user id,
- sends that id to the user lookup logic.

The /api/users/me route uses that decoded id to find the logged-in user in MongoDB and return the user information.

### Middleware protection

The middleware in src/middleware.ts checks each request for the auth token:

- public routes: /login and /signup
- protected routes: /profile and other private pages

If a logged-in user tries to visit /login or /signup, they are redirected away. If a guest tries to visit a protected page, they are redirected to /login.

## Main project structure

```text
src/
├── app/
│   ├── api/users/login/route.ts
│   ├── api/users/logout/route.ts
│   ├── api/users/me/route.ts
│   ├── api/users/signup/route.ts
│   ├── login/page.tsx
│   ├── profile/page.tsx
│   └── signup/page.tsx
├── dbConfig/dbConfig.ts
├── helpers/getDataFromToken.ts
├── middleware.ts
└── models/userModel.js
```

## Notes

- Passwords are hashed before being stored in the database.
- The app currently uses a simple JWT-based session approach with cookies.
- This is a beginner-friendly auth setup and can be extended with email verification, password reset, and role-based access later.

