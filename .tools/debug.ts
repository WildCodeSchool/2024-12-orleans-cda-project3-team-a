import 'dotenv/config';

const {
  HOST,
  BACKEND_HOST,
  BACKEND_PORT,
  FRONTEND_HOST,
  FRONTEND_PORT,
  API_URL,
  VITE_API_URL,
  EXPO_PUBLIC_API_URL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env;

// eslint-disable-next-line no-console
console.log({
  HOST,
  BACKEND_HOST,
  BACKEND_PORT,
  FRONTEND_HOST,
  FRONTEND_PORT,
  API_URL,
  VITE_API_URL,
  EXPO_PUBLIC_API_URL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
});
