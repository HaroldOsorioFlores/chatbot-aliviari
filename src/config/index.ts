import dotenv from "dotenv";
dotenv.config();

export const {
  PORT = 3010,
  jwtToken,
  numberId,
  verifyToken,
  version = "v21.0",
  client_email,
  private_key,
  spreadsheets_id,
} = process.env;
