# Fullstack Document Managment System with WYSIWYG

## Login Section

<img src="https://github.com/plugga-tech/notes-RalfiSlask/assets/112242026/cdaef6ab-8363-4545-bc8d-8f5821a2e0d0" width="250" height="210">
<img src="https://github.com/plugga-tech/notes-RalfiSlask/assets/112242026/6222b8c4-e518-49d6-b013-929ba9bca2cd" width="250" height="210"> <br>

## Document Managment

<img src="https://github.com/plugga-tech/notes-RalfiSlask/assets/112242026/53feb196-1c4e-4ef5-a545-1772833e1da9" width="250" height="210">
<img src="https://github.com/plugga-tech/notes-RalfiSlask/assets/112242026/374a57cb-fd92-4a3f-b71c-31b53dce7f86" width="250" height="210">

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


![SQL-Relations](https://github.com/plugga-tech/notes-RalfiSlask/assets/112242026/44a56542-8020-4fd0-8fde-d63afb8c3a59)

## Author

- Frontend Mentor - [@RalfiSlask](https://www.frontendmentor.io/profile/RalfiSlask)
- GitHub - [RalfiSlask](https://github.com/RalfiSlask)
