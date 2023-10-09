import express from "express";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://ardaalkan:<password>@cluster0.xmyka6w.mongodb.net/?retryWrites=true&w=majority"
);
//Sunucuyu ayağa kaldırmak için gerekli satırlar.
//Nodemon paketi ile aktif server dinleme sağlanır.
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
