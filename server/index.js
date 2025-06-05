import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import userRoutes from "./routes/user.js";
// import blogRoutes from "./routes/blogs.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;
dotenv.config();

app.use(
  cors({
    origin: "http://192.168.29.102:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.use("/api/auth", authRoutes);

app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Intenal server error";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
