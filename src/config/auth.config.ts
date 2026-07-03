import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),

  database: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  }

}))