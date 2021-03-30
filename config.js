require('dotenv').config();
module.exports = {
  databaseName: process.env.DATABASE_NAME,
  databseUrl: process.env.MONGODB_URL,
  mongoURI: `${ process.env.MONGODB_URL}${ process.env.DATABASE_NAME}`,
  port: process.env.PORT,
  //
  SENGRID_API_KEY: SENGRID_API_KEY,
  EMAIL_FROM: EMAIL_FROM,
  BASE_URL: BASE_URL
  
};