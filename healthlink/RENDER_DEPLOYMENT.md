HealthLink Render Deployment

Use this guide to deploy the HealthLink REST API so the mobile app can connect from anywhere instead of using a local laptop IP address.

Render settings:

Name:
healthlink-api

Environment:
Node

Build command:
npm install

Start command:
npm run server

Health check path:
/api/health

After deployment, Render will give a public URL similar to:
https://healthlink-api.onrender.com

Update the mobile app API URL in:
src/services/api.js

Change:
const API_BASE_URL = 'http://192.168.1.51:4000/api';

To:
const API_BASE_URL = 'https://YOUR-RENDER-URL.onrender.com/api';

Then restart Expo and test the app again in Expo Go.

Important note:
This project currently uses SQLite. On free hosting, SQLite data may reset when the service restarts or redeploys. This is acceptable for a prototype demo, but a production version should use a hosted database such as PostgreSQL.
