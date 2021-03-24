require('dotenv').config();
module.exports = {
  databaseName: process.env.DATABASE_NAME,
  databseUrl: process.env.MONGODB_URL,
  mongoURI: `${ process.env.MONGODB_URL}${ process.env.DATABASE_NAME}`,
  port: process.env.PORT,
  //
  SENGRID_API_KEY: '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',
  EMAIL_FROM: 'develop.olegch@gmail.com',
  BASE_URL: 'http://localhost:3000'
  
};