import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import friendRoutes from "./routes/friend.routes.js";

const app = express();
const PORT = process.env.PORT; 

import { connectDB } from "./config/db.js";

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("api/v1/friends", friendRoutes);

app.get("/", (req, res) => {
    res.send("Server is working");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

