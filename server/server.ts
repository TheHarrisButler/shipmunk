import jsonwebtoken from "jsonwebtoken";
import express from "express";
import cors from "cors";
import "dotenv/config";
import * as fs from "fs";

const app = express();

app.use(cors());

const generateToken = async () => {
  const payload = {
    partner: process.env.SHIPENGINE_PARTNER_ID,
    tenant: process.env.SHIPENGINE_SELLER_ID,
  };

  if (!process.env.SHIPENGINE_GATEWAY_SECRET) {
    throw new Error("SHIPENGINE_GATEWAY_SECRET is not defined");
  }

  const token = await jsonwebtoken.sign(
    payload,
    process.env.SHIPENGINE_GATEWAY_SECRET,
    {
      algorithm: "RS256",
      expiresIn: 3600,
      issuer: process.env.PLATFORM_TOKEN_ISSUER,
      keyid: process.env.PLATFORM_TOKEN_KEY_ID,
    }
  );

  return token;
};

app.get("/generate-token", async (_req, res) => {
  try {
    const token = await generateToken();

    if (!token) {
      throw new Error("No token generated");
    }

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.use(express.static("server/public"))

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});
