import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

//Routes
import userRouter from './routes/user.routes.js'

//routes decleration
app.use('/api/v1/user' , userRouter)

export { app };

