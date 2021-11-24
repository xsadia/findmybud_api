import dotenv from "dotenv";
dotenv.config();

export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "fezon",
    expiresIn: "15d",
  },
};

export const passwordRecoverConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "fezon",
    expiresIn: "2h",
  },
};
