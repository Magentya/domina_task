import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT,
  bd_host: process.env.BD_HOST,
  bd_user: process.env.BD_USER,
  bd_pass: process.env.BD_PASS,
  bd_name: process.env.BD_NAME,
};