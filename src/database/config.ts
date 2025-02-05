import { createClient } from "@libsql/client";

import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.TURSO_DATABASE_URL!;
const dbAuthToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({ 
  url: dbUrl,
  authToken: dbAuthToken
});

export default db;