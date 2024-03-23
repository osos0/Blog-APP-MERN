import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./Route/User-Route.js";
import authRoute from "./Route/auth-Route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const port = 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
