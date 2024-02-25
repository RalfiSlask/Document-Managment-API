# Fullstack Document Managment System with WYSIWYG

## Login Section

<img src="https://github.com/RalfiSlask/Document-Managment-API/assets/112242026/5197faef-8417-4629-9056-aa25282c4a3a" width="250" height="210"> 
<img src="https://github.com/RalfiSlask/Document-Managment-API/assets/112242026/0bc76013-adc8-4f2f-9e0e-188b48529751" width="250" height="210"> <br>

## Document Managment

<img src="https://github.com/RalfiSlask/Document-Managment-API/assets/112242026/448a7428-d3db-431f-94a2-0dc66f46c586" width="250" height="210">
<img src="https://github.com/RalfiSlask/Document-Managment-API/assets/112242026/b604844f-1b9a-4d3d-8c4c-83fcdbfed08f" width="250" height="210">

## Tech Stack

### Frontend

- HTML5
- Typescript
- React
- Tailwind CSS
- Sass

### Backend

- SQL
- Express.JS

### Build Tools

- Vite
- Express generator

### WYSIWYG

- TinyMCE

## Formatting

This projects uses code standards by applying the eslint and prettier tools:

- **Eslint**: identifies bugs and patterns to make the code more consistent.
- **Prettier**: code formatter for making the code more readable and consistent.

## Status

This project is marked as "In Progress"

## Getting Started

To run the Document Managment web application on you local machine, follow these steps:

1. Download or clone the repository.
2. Install the necessary dependencies by running `npm install`.
3. Setup database with information provided in this readme.
4. Start the frontend application using `npm run dev`.
5. Start the backend using `nodemon start` or `node start`.

## App Description

This web application is a document managment system that lets users manage documents with an WYSIWYG editor where you can upload files, change fonts/colors for text and many other options.

## Client Features

- **Login form**: User can login with stored password and mail.
- **Create account**: User can create a new account with password, email and name.
- **Password Strength**: Checks the strength of the user password from weak to strong.
- **Dashboard**: Shows documents for the specific user.
- **Add new document**: User can create a new document.
- **Edit document**: Option to edit document.
- **Delete document**: User can soft delete documents.
- **WYSIWYG Editor**: Write or upload content with a document editor. Several options available.

## Security

- Password checker for client
- JWT tokens as http cookies
- Auth checks on server
- Encryption of passwords
- uuids
- Sanitaztion of innerHTML

## Information

- This project is only an excersice so information will be public instead of being in env. The info provided is also in server and client example.env files.

### Database

- DB_USER=RalfiSlask
- DB_PASS=mongoDB123!
- DB_HOST=localhost
- DB_PORT=3306
- DB=ralfislask
- JWT_KEY=secret
- CORS_ORIGIN=http://localhost:5173

### Frontend

- VITE_WYSIWYG_KEY=uqt14b9gr68llpdlflf56vsp03j7gh2qziau3yuo150fcy6b

### SQL Relations

![SQL-Relations](https://github.com/RalfiSlask/Document-Managment-API/assets/112242026/95bd296c-1b1e-43e1-a183-03fdd3a6faae)

## Author

- Frontend Mentor - [@RalfiSlask](https://www.frontendmentor.io/profile/RalfiSlask)
- GitHub - [RalfiSlask](https://github.com/RalfiSlask)
