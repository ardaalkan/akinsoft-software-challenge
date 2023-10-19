import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

// .env dosyasındaki çevresel değişkenleri yükler
dotenv.config();

// MongoDB veritabanına bağlanma işlemi
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Express uygulamasını oluştur
const app = express();

// Uygulamayı belirtilen portta dinlemeye başla
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Çerez işleme için gerekli orta yazılımı kullan
app.use(cookieParser());

// JSON verileri işleme için gerekli Express orta yazılımını kullan
app.use(express.json());

// Özel rotaları yönlendirme dosyaları aracılığıyla tanımla
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Hata yönetimi için bir orta yazılım ekle
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message,
  });
});
