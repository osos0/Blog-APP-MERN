import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Route/User-Route.js";

dotenv.config();

const app = express();
const port = 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/user", userRoute);
