require('dotenv').config();

const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER || 'root'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_DATABASE = process.env.DB_DATABASE || 'companydb'
const DB_PORT = process.env.DB_PORT || 3306
const JWT_SECRET = process.env.JWT_SECRET
const DB_PASSWORD = process.env.DB_PASSWORD
const NODE_ENV = process.env.NODE_ENV
const VITE_APP_API_URL = process.env.VITE_APP_API_URL

module.exports = {
  PORT: PORT,
  DB_USER: DB_USER,
  DB_HOST: DB_HOST,
  DB_DATABASE: DB_DATABASE,
  DB_PORT: DB_PORT,
  JWT_SECRET: JWT_SECRET,
  DB_PASSWORD: DB_PASSWORD,
  NODE_ENV: NODE_ENV,
  VITE_APP_API_URL: VITE_APP_API_URL
};