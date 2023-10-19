import mongoose from "mongoose";

// Kullanıcı şemasını tanımla
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Kullanıcı adı alanı bir metin (String) türünde.
      required: true, // Bu alan zorunludur (boş olamaz).
      unique: true, // Bu alanın değeri benzersiz olmalıdır (başka bir kullanıcı tarafından kullanılamaz).
    },
    email: {
      type: String, // E-posta alanı bir metin (String) türündedir.
      required: true, // Bu alan zorunludur (boş olamaz).
      unique: true, // Bu alanın değeri benzersiz olmalıdır (başka bir kullanıcı tarafından kullanılamaz).
    },
    password: {
      type: String, // Şifre alanı bir metin (String) türündedir.
      required: true, // Bu alan zorunludur (boş olamaz).
    },
  },
  { timestamps: true } // Bu seçenek, her belgeye otomatik olarak oluşturma ve güncelleme tarihlerini ekler.
);

// "User" adında bir Mongoose modeli oluştur
const User = mongoose.model("User", userSchema);

// Modeli dışa aktar
export default User;
