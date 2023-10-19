// Hata işlevi, belirli bir duruma göre özel bir hata oluşturur.
export const errorHandler = (statusCode, message) => {
  // Yeni bir hata nesnesi oluştur
  const error = new Error();

  // Hata durumunu ve iletiyi ayarla
  error.statusCode = statusCode;
  error.message = message;

  // Oluşturulan hatayı döndür
  return error;
};
