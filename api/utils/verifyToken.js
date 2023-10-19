import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Token doğrulama işlevi
export const verifyToken = (req, res, next) => {
  // İstekten "access_token" adında bir çerez (cookie) al
  const token = req.cookies.access_token;

  // Eğer token yoksa, "Unauthorized" (401) hatası oluşturup ileri yönlendir
  if (!token) return next(errorHandler(401, "Unauthorized"));

  // Token'ı doğrula
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Eğer token geçerli değilse, "Forbidden" (403) hatası oluşturup ileri yönlendir
    if (err) return next(errorHandler(403, "Forbidden"));

    // Kullanıcı bilgisini istek nesnesine ekleyip devam et
    req.user = user;
    next();
  });
};
