import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

/*
createListing: Yeni bir "listing" oluşturmak için kullanılır. HTTP isteği ile gelen verilere dayalı 
olarak yeni bir "listing" oluşturur ve oluşturulan "listing"i yanıt olarak döner. 
Eğer işlem başarısız olursa, bir hata oluşursa, bu hatayı sonraki işleme (middleware) iletir. 
*/

export const deleteListing = async (req, res, next) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.status(200).json("Listing has been deleted!");
};

/*
deleteListing: Bir "listing"i silmek için kullanılır. 
HTTP isteği ile gelen id parametresine göre belirli bir "listing"i siler 
ve başarılı bir yanıt döner. Herhangi bir hata oluşmazsa, işlemi sonlandırır.
*/

export const updateListing = async (req, res, next) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

/*
updateListing: Mevcut bir "listing"i güncellemek için kullanılır. 
HTTP isteği ile gelen id parametresine ve güncellenmiş verilere dayalı olarak bir 
"listing"i günceller. Güncellenen "listing"i yanıt olarak döner. 
Eğer güncelleme işlemi başarısız olursa, bir hata oluşursa, 
bu hatayı sonraki işleme iletir.
*/

export const answerListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const newAnswer = req.body.answer;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // Append the new answer to the answers array
    listing.answers.push(newAnswer);

    // Save the updated listing
    const updatedListing = await listing.save();

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getAnswers = async (listingId) => {
  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      throw errorHandler(404, "Listing not found!");
    }

    const answers = listing.answers;

    return answers;
  } catch (error) {
    throw error;
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

/*
getListing: Belirli bir "listing"i almak için kullanılır. 
HTTP isteği ile gelen id parametresine göre belirli bir "listing"i 
veritabanından alır ve yanıt olarak döner. 
Eğer belirli bir "listing" bulunamazsa, 
404 HTTP durum kodu ile birlikte bir hata oluşturur ve 
bu hatayı sonraki işleme iletir.
*/
