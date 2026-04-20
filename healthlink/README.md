# HealthLink UK

HealthLink UK is a React Native mobile application built with Expo. It allows patients to request hospital appointments and allows hospital staff to confirm or reject those appointment requests.

The project also includes a Node.js and Express REST API with an SQLite database layer using `sql.js`.

## Main Features

- Patient login
- Staff login
- Patient appointment booking
- Appointment cancellation
- Staff appointment confirmation and rejection
- Staff search and filtering
- Patient profile
- Editable contact and medical details
- Accessibility settings such as large text and high contrast
- Local notification when an appointment is confirmed

## Demo Login Details

Patient account:

```text
Username: patient1
Password: patient1
```

Staff account:

```text
Username: staff1
Password: staff1
```

## Requirements

- Node.js
- npm
- Expo Go installed on a mobile phone
- Phone and computer connected to the same Wi-Fi network

## Setup

Open a terminal in the project folder:

```powershell
cd "C:\Users\chris\Documents\New project\healthlink"
```

Install dependencies:

```powershell
npm install
```

## Running The App

Start the backend API and Expo app together:

```powershell
npm run dev
```

Then open Expo Go on your phone and scan the QR code shown in the terminal.

## Important API Note

The mobile app connects to the backend API using the computer's local Wi-Fi IP address.

This is set in:

```text
src/services/api.js
```

If the app says API data could not be loaded, check the computer's IPv4 address using:

```powershell
ipconfig
```

Then update the API URL in `src/services/api.js`.

Example:

```js
const API_BASE_URL = 'http://YOUR-IP-ADDRESS:4000/api';
```

The app can also use a hosted API URL. If the backend is deployed online, start Expo with:

```powershell
$env:EXPO_PUBLIC_API_BASE_URL="https://YOUR-RENDER-URL.onrender.com/api"
npm run start
```

For an APK build, set the same `EXPO_PUBLIC_API_BASE_URL` value before building the app.

## Hosted API Deployment

The project includes a `render.yaml` file for Render deployment.

Render uses:

```text
Build Command: npm install
Start Command: npm run server
Health Check Path: /api/health
```

After deploying, Render gives a public URL such as:

```text
https://healthlink-api.onrender.com
```

The app API URL would then be:

```text
https://healthlink-api.onrender.com/api
```

## Backend API

The backend runs on:

```text
http://localhost:4000
```

Health check route:

```text
http://localhost:4000/api/health
```

Expected response:

```json
{"status":"ok"}
```

## SQLite Database

The SQLite database is created automatically in the backend when the server starts.

The backend creates and uses three main tables:

- users
- patient_profile
- appointments

## Troubleshooting

If Expo Go does not load the app:

- Make sure `npm run dev` is still running.
- Make sure the phone and computer are on the same Wi-Fi.
- Restart Expo and scan the QR code again.
- Check that the API URL in `src/services/api.js` matches the computer's current IPv4 address.

If the backend does not start:

- Make sure dependencies are installed with `npm install`.
- Make sure port `4000` is not already being used.

If old database data appears:

- Stop the backend.
- Run `npm run dev` again.

The database will be recreated with sample data.
