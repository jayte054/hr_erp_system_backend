import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRATION : process.env.JWT_EXPIRATION,
    dialectOptions: {
        encrypt: true,
        ssl: {
          rejectUnauthorized: false,
        },
      },
};
console.log("running production mode")
