import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });
//Sunucuyu ayağa kaldırmak için gerekli satırlar.
//Nodemon paketi ile aktif server dinleme sağlanır.
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json()),
app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);
