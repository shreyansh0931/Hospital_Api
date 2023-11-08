# Hospital API

This is an API for the doctors of a Hospital allocated by the government for testing, quarantine, and the well-being of COVID-19 patients. It allows two types of users: doctors and patients.

## User Types

1. **Doctors**: Doctors can log in and perform various actions.
2. **Patients**: Patients can be registered and have reports created by doctors.

## API Endpoints

### Doctors

- `POST /doctors/register`: Register a doctor with a username and password.
- `POST /doctors/login`: Log in as a doctor and get a JWT for authentication.

### Patients

- `POST /patients/register`: Register a patient with phone number (if the patient already exists, their info is returned).
- `POST /patients/:id/create_report`: Create a health report for a patient.
- `GET /patients/:id/all_reports`: List all the reports of a patient, ordered from oldest to latest.

### Reports

- `GET /reports/:status`: List all reports of all patients filtered by a specific status.

## Patient Report

A patient report has the following fields:

- Created by doctor
- Status (enums): Can be one of the following: Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit.

## Authentication

- Authentication is handled using JSON Web Tokens (JWT).

## Usage

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Set up your environment variables in a `.env` file. (Refer to the provided example).
4. Run the application using `npm start`.
5. Use Postman or any API testing tool to make requests to the API endpoints.

## Environment Variables

Create a `.env` file with the following variables:

PORT=8080
MONGODB_URI=YOUR_MONGODB_URI
SECRET_KEY=YOUR_SECRET_KEY

Make sure to replace `YOUR_MONGODB_URI` and `YOUR_SECRET_KEY` with your MongoDB connection URI and a secret key for JWT authentication.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (for JWT authentication)

## Contributors

Shreyansh Srivastava  

