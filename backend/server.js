import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

console.log("RAW URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGODB_URI is missing");
    }

   await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
});
    console.log("MongoDB connected");
  } catch (err) {
  console.error("FULL DB ERROR:");
  console.error(err);

  }
};

app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
  await connectDB();
});